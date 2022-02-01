from django.urls import path

from iplbackendapi.views import allPlayerDataView, allTeamDataView, calculatorView, leaderboardView, loginView, playerView, playing11View, powercardView, searchPlayerView, teamView, test

# baseUrl = '/api'

urlpatterns = [
    path('verify',loginView.as_view(),name="login"),
    path('player',playerView.as_view(),name="player"),
    path('team/<str:pk>',teamView.as_view(),name="team"),
    path('search/<str:pk>',searchPlayerView.as_view(),name="search-player"),
    path('all-team-data/<str:pk>',allTeamDataView.as_view(),name="all-team-data"),
    path('all-player-data/<str:pk>',allPlayerDataView.as_view(),name="all-player-data"),
    path('powercard/<str:pk>',powercardView.as_view(),name="powercard"),
    path('calculator/<str:pk>',calculatorView.as_view(),name="calculator"),
    path('leaderboard/',leaderboardView.as_view(),name="leaderboard"),
    path('playing11/<str:pk>',playing11View.as_view(),name="playing11"),
    path('test',test.as_view(),name="test"),
]