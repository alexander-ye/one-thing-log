from django.db import models

class Thing(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=200)

  class Meta:
    ordering = ['-modified']