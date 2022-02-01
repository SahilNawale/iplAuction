from sre_parse import CATEGORIES
from unittest import result
from venv import create
from rest_framework.views import APIView
from .models import player, playing11, token,team
from django.db import connection
from rest_framework.response import Response

playerChemistry = {'Virat Kohli':'AB de Villiers','MS Dhoni':'Ravindra Jadeja','KL Rahul':'Chris Gayle','Quinton de Kock':'Rohit Sharma','David Warner':'Shikhar Dhawan','Trent Boult':'Jasprit Bumrah','Deepak Chahar':'Shardul Thakur','Kagiso Rabada':'Anrich Nortje','Bhuvneshwar Kumar':'Rashid Khan','Pat Cummins':'Andre Russell'}

# def checkPlayerChemistry(player1,player2):

def query(q):
    with connection.cursor() as c:
        c.execute(q)
        if q[0:6].lower()=="select":
            return dictfetchall(c)
        else :
            return "success"

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

class teamView(APIView):
    def get(self,request,pk,format=None):
        room = request.headers['token'][11]
        team = request.headers['token'][5]
        if pk=="players-bought":#get all players bought by a team
            result = query(f"select * from iplbackendapi_player where id in (select player_id from iplbackendapi_soldplayer where team_id='{team}' and room='{room}')")
            for player in result :
                player['price'] = query(f"select price from iplbackendapi_soldplayer where team_id='{team}' and room='{room}' and player_id='{player['id']}'")[0]['price']
                player['playing11'] = query(f"select playing11 from iplbackendapi_soldplayer where team_id='{team}' and room='{room}' and player_id='{player['id']}'")[0]['playing11']
            return Response(result)
        if pk=="details":#get team details by id
            result = query(f"select * from iplbackendapi_team where id='{team}'")     
            return Response(result)       
        if pk=="statistics":
            result = query(f"select * from iplbackendapi_player where id in (SELECT player_id FROM iplbackendapi_team join iplbackendapi_soldplayer where iplbackendapi_team.id = iplbackendapi_soldplayer.team_id and team_id='{team}' and iplbackendapi_team.room='{room}')")
            batCount = 0
            bowlCount = 0
            allCount = 0
            starredCount = 0
            uncappedCount = 0
            foreignCount = 0
            wkCount = 0
            highestOverall = 0
            highestOverallName = "None"
            for player in result:
                if player['type'] == "BAT":
                    batCount +=1
                if player['type'] == "BOWL":
                    bowlCount +=1
                if player['type'] == "ALL":
                    allCount +=1
                if player['is_starred']:
                    starredCount+=1    
                if player['is_uncapped']:
                    uncappedCount+=1    
                if player['foreign']:
                    foreignCount+=1    
                if player['is_wk']:
                    wkCount+=1       
                if player['overall']>highestOverall:
                    highestOverall = player['overall']
                    highestOverallName = player['name']
            stats = {"bat":batCount,"bowl":bowlCount,"all":allCount,"starred":starredCount,"uncapped":uncappedCount,"foreign":foreignCount,"wk":wkCount,"highestOverall":highestOverall,"highestOverallName":highestOverallName,"total":batCount+bowlCount+allCount}
            return Response(stats)

class playerView(APIView):
    def get(self,request,format=None): #get all unsold players in a team
        room = request.headers['token'][11]
        custom_query = f"select * from iplbackendapi_player where id not in (select player_id from iplbackendapi_soldplayer where room='{room}')"
        result = query(custom_query)
        return Response(result)

class searchPlayerView(APIView):
    def get(self,request,pk,format=None):
        return Response(query(f"select * from iplbackendapi_player where name like '%{pk}%'"))

class allTeamDataView(APIView):
    def get(self,request,pk,format=None):
        room = request.headers['token'][11]
        result = query(f"select * from iplbackendapi_team where name='{pk}' and room='{room}'")
        return Response(result)  

class allPlayerDataView(APIView):
    def get(self,request,pk,format=None):
        room = request.headers['token'][11]
        result = query(f"SELECT * FROM 'iplbackendapi_soldplayer' join 'iplbackendapi_player' where room='{room}' and iplbackendapi_soldPlayer.team_id=(select id from 'iplbackendapi_team' where name='{pk}' and room='{room}') and iplbackendapi_soldPlayer.player_id=iplbackendapi_player.id")
        return Response(result)  

class powercardView(APIView):
    def get(self,request,pk,format=None):
        room = request.headers['token'][11]
        if pk.isnumeric():
            q = f"select * from iplbackendapi_soldpowercard  join iplbackendapi_powercard where team_id = '{pk}' and room = '{room}' and iplbackendapi_powercard.id=iplbackendapi_soldpowercard.powercard_id"
        else:
            q = f"select * from iplbackendapi_soldpowercard join iplbackendapi_powercard where team_id=(select id from iplbackendapi_team where name='{pk}' and room='{room}') and room = '{room}' and iplbackendapi_powercard.id=iplbackendapi_soldpowercard.powercard_id"
        result = query(q)
        return Response(result)

class loginView(APIView):
    def post(self,request,format=None):
        data = request.data
        tk = token.objects.filter(token=data['token'])
        if tk :
            return Response("Success")
        else :
            return Response("Fail")


class playing11View(APIView):

    def get(self,req,pk,format=None): #get stats of playing 11 of a team
        room = req.headers['token'][11]
        team = req.headers['token'][5]
        result = query(f"select * from iplbackendapi_player where id in (select player_id from iplbackendapi_soldplayer where room='{room}' and team_id='{team}' and playing11=True)")
        print(result)
        score = 0
        batCount = 0
        bowlCount = 0
        allCount = 0
        starredCount = 0
        uncappedCount = 0
        foreignCount = 0
        wkCount = 0
        highestOverall = 0
        highestOverallName = "None"
        for player in result:
            score = score + player['overall']
            if player['type'] == "BAT":
                batCount +=1
            if player['type'] == "BOWL":
                bowlCount +=1
            if player['type'] == "ALL":
                allCount +=1
            if player['is_starred']:
                starredCount+=1    
                score +=2
            if player['is_uncapped']:
                uncappedCount+=1    
            if player['foreign']:
                foreignCount+=1    
            if player['is_wk']:
                wkCount+=1       
            if player['overall']>highestOverall:
                highestOverall = player['overall']
                highestOverallName = player['name']
            for player2 in result :
                    if playerChemistry.get(player['name'],None)==player2['name']:
                            score +=5    
        stats = {"bat":batCount,"bowl":bowlCount,"all":allCount,"starred":starredCount,"uncapped":uncappedCount,"foreign":foreignCount,"wk":wkCount,"highestOverall":highestOverall,"highestOverallName":highestOverallName,"total":batCount+bowlCount+allCount,"score":score}
        return Response(stats)

    def post(self,req,pk,format=None):
        playerId = (req.data)['playerId']  
        room = req.headers['token'][11]
        team = req.headers['token'][5]
        if pk=="add":
            query(f"update iplbackendapi_soldPlayer set playing11=true where team_id='{team}' and room='{room}' and player_id='{playerId}'")
        elif pk=="remove":
            query(f"update iplbackendapi_soldPlayer set playing11=false where team_id='{team}' and room='{room}' and player_id='{playerId}'")
        return Response("Done")            

class calculatorView(APIView):
    def get(self,req,pk,format=None):
        team = req.headers['token'][5]
        room = req.headers['token'][11]
        if pk=="batsman":
            result = query(f"SELECT * FROM 'iplbackendapi_player' where (type='BAT' or type='ALL') and id in (select player_id from iplbackendapi_soldplayer where room='{room}' and team_id='{team}' and playing11=true)")
        if pk=="bowler":
            result = query(f"SELECT * FROM 'iplbackendapi_player' where (type='BOWL' or type='ALL') and id in (select player_id from iplbackendapi_soldplayer where room='{room}' and team_id='{team}' and playing11=true)")
        for player in result:
            player['PPL']=player['MO']=player['DEATH']=False
            player['count'] = 0
        return Response(result)

    def post(self,req,pk,format=None):
        team_id = req.headers['token'][5]
        room = req.headers['token'][11]
        data = req.data
        if pk=="save-players":
            query(f"delete from iplbackendapi_playing11 where team_id='{team_id}'")
            types = ['BAT','BOWL']
            categories = ['PPL','MO','DEATH']
            for type in types :
                for category in categories :
                    for p in data[type][category]:
                        tm = team.objects.filter(id=team_id).first()
                        pl = player.objects.filter(id=p['id']).first()
                        insertedPlayer = playing11.objects.create(team=tm,player=pl)
                        insertedPlayer.save()
        elif pk=="save-score":
            query(f"update iplbackendapi_team set score='{data.get('score',None)}' where id='{team_id}'")
        return Response("Success")

    # def post(self,req,pk,format=None):
    #     team = req.headers['token'][5]
    #     player_id = req.data['player_id']
    #     newPlaying11 = playing11.objects,create(team=team,player=player_id,category=query("select type from player where"))

class leaderboardView(APIView):
    def get(self,req,format=None):
        room = req.headers['token'][11]
        result = query(f"select name,score from iplbackendapi_team where room='{room}' order by score desc")
        return Response(result)

class test(APIView):
    def get(self,req,format=None):
        result = query("Select * from iplbackendapi_player ") 
        ans=[]
        for player in result :
            if player['image'] == "":
                ans.append(player)
        return Response(ans)



