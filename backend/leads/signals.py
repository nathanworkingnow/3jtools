from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Lead
from .services import TrelloService

@receiver(post_save, sender=Lead)
def sync_lead_to_trello(sender, instance, created, **kwargs):
    if not instance.trello_card_id:
        service = TrelloService()
        result, error = service.create_card(instance)
        if result:
            instance.trello_card_id = result['id']
            instance.save(update_fields=['trello_card_id'])

@receiver(pre_save, sender=Lead)
def update_trello_on_status_change(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_lead = Lead.objects.get(pk=instance.pk)
            if old_lead.status != instance.status and instance.trello_card_id:
                service = TrelloService()
                service.move_card(instance.trello_card_id, instance.status)
        except Lead.DoesNotExist:
            pass