from rest_framework.views import APIView
from rest_framework.response import Response

class AIChatbotView(APIView):

    def post(self,request):
        message = request.data.get('message','').lower()

        if 'pool' in message and 'clean' in message:
            reply = 'Yes, our platform offers pool cleaning services provided by professional experts.'

        elif 'spa' in message:
            reply = 'You can find experts that specialize in spa maintenance, repair and cleaning.'

        elif 'price' in message or 'cost' in message:
            reply = 'Each service has its own price which you can see on the service detail page.'

        elif 'book' in message or 'avail' in message:
            reply = 'You can avail a service by selecting one and completing the PayPal payment.'

        elif 'seller' in message or 'expert' in message:
            reply = 'Experts can apply as sellers through the Apply Seller page and wait for admin approval.'

        elif 'payment' in message:
            reply = 'Payments are processed through PayPal and go directly to the seller.'

        else:
            reply = 'This platform helps you find trusted Pool and Spa service experts. You can browse services, view details, and book them easily.'

        return Response({'response':reply})