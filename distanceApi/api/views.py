# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from decimal import Decimal
from math import sin, cos, sqrt, atan2, radians


@api_view(['POST'])
def distance(request):
    try:
        from_lat = Decimal(request.data.get("from").get("lat"))
        from_lon = Decimal(request.data.get("from").get("lon"))
        to_lat = Decimal(request.data.get("to").get("lat"))
        to_lon = Decimal(request.data.get("to").get("lon"))
    except:
        return Response({"code": 0, "message": "Please make sure you enter decimal values"})
    # verifying if the values are correct
    if (-90 <= from_lat <= 90) and (-90 <= to_lat <= 90) and (-180 <= from_lon <= 180) and (-180 <= to_lon <= 180):
        # approximate radius of earth in km
        R = 6373.0

        dlon = radians(to_lon) - radians(from_lon)
        dlat = radians(to_lat) - radians(from_lat)
        a = sin(dlat / 2) ** 2 + cos(radians(from_lat)) * cos(radians(to_lat)) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        distance = R * c

        return Response({"code": 1, "message": "Distance calculated successfully", "distance": distance})
    else:
        return Response({"code": 0, "message": "Invalid latitude or longitude value"})
