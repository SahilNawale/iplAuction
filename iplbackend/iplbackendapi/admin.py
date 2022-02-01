from re import search
from django.contrib import admin
from .models import player, playing11, powercard, soldPlayer, soldPowerCard,team,token

class playerAdmin(admin.ModelAdmin):
    list_filter = ['color','type','foreign','is_starred','is_wk','is_uncapped']
    search_fields = ['name','id']

class teamAdmin(admin.ModelAdmin):
    list_filter = ['room','id']
    search_fields = ['name', 'id','room','score','budget']
    readonly_fields = ('id',)

class soldPlayerAdmin(admin.ModelAdmin):
    list_filter = ['room','team','player']
    search = ['room','team','player']

admin.site.register(player,playerAdmin)
admin.site.register(team,teamAdmin)
admin.site.register(soldPlayer,soldPlayerAdmin)
admin.site.register(token)
admin.site.register(powercard)
admin.site.register(soldPowerCard)
admin.site.register(playing11)

#test , test

#remove duplicates,add missing player and missing player images
