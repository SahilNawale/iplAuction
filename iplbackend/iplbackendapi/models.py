from django.db import models

TEAMS = (
    ('MI', 'MI'),
    ('CSK', 'CSK'),
    ('RCB', 'RCB'),
    ('PK', 'PK'),
    ('RR', 'RR'),
    ('DC', 'DC'),
    ('KKR', 'KKR'),
    ('SRH', 'SRH'),
)

PLAYER_TYPE = (
    ('ALL', 'ALL'),
    ('BAT', 'BAT'),
    ('BOW', 'BOW'),
)

class player(models.Model):

    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to='player-images')
    type = models.CharField(max_length=5, choices=PLAYER_TYPE,default="ALL")
    is_wk = models.BooleanField(default=False)
    is_uncapped = models.BooleanField(default=False)
    is_starred = models.BooleanField(default=False)
    foreign = models.BooleanField(default=False)
    overall = models.IntegerField(default=0)
    bat_ppl = models.IntegerField(default=0)
    bow_ppl = models.IntegerField(default=0)
    bat_mid = models.IntegerField(default=0)
    bow_mid = models.IntegerField(default=0)
    bat_death = models.IntegerField(default=0)
    bow_death = models.IntegerField(default=0)
    color = models.CharField(max_length=50,default="red",null=True,blank=True)

    def __str__(self):
        return self.name


class team(models.Model):

    name = models.CharField(max_length=20,default="RCB")
    room = models.IntegerField()
    score = models.IntegerField(default=0,null=True)
    budget = models.FloatField(default=100.00)
    
    def __str__(self):
        return str(self.name) + " Room : " + str(self.room)


class soldPlayer(models.Model):
    player = models.ForeignKey(player,on_delete=models.CASCADE)
    room = models.IntegerField()
    team = models.ForeignKey(team,on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    playing11 = models.BooleanField(default=False)

    def __str__(self):
        return str(self.player)+" "+str(self.team)

    def save(self, *args, **kwargs):
        buying_team = team.objects.get(room=self.room,name=(str(self.team).split(" ")[0])) 
        buying_team.budget -= self.price
        buying_team.save()
        super().save(*args, **kwargs)  # Call the "real" save() method.  

    def delete(self, *args, **kwargs):
        buying_team = team.objects.get(room=self.room,name=(str(self.team).split(" ")[0])) 
        buying_team.budget += self.price
        buying_team.save()
        super().delete(*args, **kwargs)  # Call the "real" save() method.     


class powercard(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to='powercards')

    def __str__(self):
        return str(self.name)

class soldPowerCard(models.Model):
    powercard = models.ForeignKey(powercard,on_delete=models.CASCADE,default=None)
    used = models.BooleanField(default=False)
    room = models.IntegerField()
    team = models.ForeignKey(team,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.powercard)+ "  -  "+ str(self.team) 

class playing11(models.Model):
    team = models.ForeignKey(team,on_delete=models.CASCADE)
    player = models.ForeignKey(player,on_delete=models.CASCADE)

class token(models.Model):
    token = models.CharField(max_length=20)    

    def __str__(self):
        return str(self.token) + " Team: "+str(self.token[5]) + " Room: "+str(self.token[11])


# 4 random character + team_number + 5 random characters + room_number 
# g5dx9h893d3


#remove team_number