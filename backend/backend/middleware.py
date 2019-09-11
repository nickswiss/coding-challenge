import time


class CORSMiddleware(object):
    """
    Allows cross origin requests to come through un-blocked
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        response["Access-Control-Allow-Methods"] = "*"
        return response


class DelayMiddleware(object):
    """
    Adds a specified delay to the request
    Useful when debugging async UI when server responds too fast
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        path = request.get_full_path()
        # skipping sleep on click and landing page
        skip_sleep = any(
            ["click" in path, "landing" in path, request.method == "OPTIONS"]
        )
        if not skip_sleep:
            time.sleep(0.5)
        return response
