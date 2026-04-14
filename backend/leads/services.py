import os
import requests
from django.conf import settings

class TrelloService:
    STATUS_LIST_MAP = {
        'new': 'TRELLO_LIST_NEW',
        'contacted': 'TRELLO_LIST_CONTACTED',
        'qualified': 'TRELLO_LIST_QUALIFIED',
        'proposal': 'TRELLO_LIST_PROPOSAL',
        'won': 'TRELLO_LIST_WON',
        'lost': 'TRELLO_LIST_LOST',
    }
    
    def __init__(self):
        self.api_key = os.getenv('TRELLO_API_KEY')
        self.token = os.getenv('TRELLO_SECRET')
        self.base_url = "https://api.trello.com/1"
    
    def _get_headers(self):
        return {'Content-Type': 'application/json'}
    
    def _get_auth_params(self):
        return {'key': self.api_key, 'token': self.token}
    
    def create_card(self, lead):
        if not self.api_key or not self.token:
            return None, "Trello not configured"
        
        list_id = os.getenv(self.STATUS_LIST_MAP.get(lead.status, 'TRELLO_LIST_NEW'))
        if not list_id:
            list_id = os.getenv('TRELLO_LIST_NEW')
        
        url = f"{self.base_url}/cards"
        params = self._get_auth_params()
        
        card_data = {
            'name': f"{lead.company_name} - {lead.contact_name}",
            'desc': f"Email: {lead.email}\nPhone: {lead.phone}\nStatus: {lead.status}\n\nNotes: {lead.notes or 'No notes'}",
            'idList': list_id,
        }
        
        try:
            response = requests.post(url, params=params, json=card_data, timeout=10)
            if response.status_code == 200:
                card = response.json()
                return {'id': card['id'], 'url': card['url']}, None
            return None, f"Trello error: {response.status_code}"
        except Exception as e:
            return None, str(e)
    
    def move_card(self, card_id, status):
        if not self.api_key or not self.token:
            return False, "Trello not configured"
        
        list_id_name = self.STATUS_LIST_MAP.get(status)
        list_id = os.getenv(list_id_name)
        if not list_id:
            return False, f"No list configured for status: {status}"
        
        url = f"{self.base_url}/cards/{card_id}"
        params = self._get_auth_params()
        data = {'idList': list_id}
        
        try:
            response = requests.put(url, params=params, json=data, timeout=10)
            if response.status_code == 200:
                return True, None
            return False, f"Trello error: {response.status_code}"
        except Exception as e:
            return False, str(e)
    
    def update_card(self, card_id, lead):
        if not self.api_key or not self.token:
            return False, "Trello not configured"
        
        url = f"{self.base_url}/cards/{card_id}"
        params = self._get_auth_params()
        
        card_data = {
            'name': f"{lead.company_name} - {lead.contact_name}",
            'desc': f"Email: {lead.email}\nPhone: {lead.phone}\nStatus: {lead.status}\n\nNotes: {lead.notes or 'No notes'}",
        }
        
        try:
            response = requests.put(url, params=params, json=card_data, timeout=10)
            if response.status_code == 200:
                return True, None
            return False, f"Trello error: {response.status_code}"
        except Exception as e:
            return False, str(e)
    
    def delete_card(self, card_id):
        if not self.api_key or not self.token:
            return False, "Trello not configured"
        
        url = f"{self.base_url}/cards/{card_id}"
        params = self._get_auth_params()
        
        try:
            response = requests.delete(url, params=params, timeout=10)
            return response.status_code in [200, 204], None
        except Exception as e:
            return False, str(e)