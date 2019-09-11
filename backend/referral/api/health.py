from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def health_check(request):
    """
    Health check for load balancing
    Args:
        request (Request): django rest framework request
    Returns:
        Response: successful response with 200 status code
    """
    return Response({"status": "OK"}, status=200)
