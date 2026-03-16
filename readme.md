Backend Setup

git clone https://github.com/jiem01/quiz6.git, cd quiz6, cd my_project

python -m venv venv

pip install -r requirement.txt

python manage.py runserver

python manage.py makemigrations, python manage.py migrate

python manage.py createsuperuser

Backend API URLs

Base URL: /api/v1/

Users
Endpoint	Method	Description
/api/v1/users/login/	POST	Login with email & password. Returns JWT and user info.
/api/v1/users/register/	POST	Register new user. Payload: email, username, phone_number, first_name, last_name, location, gender, password, confirm_password
/api/v1/users/profile/	GET	Get logged-in user profile (requires JWT)
/api/v1/users/	GET	Admin only: list all users

Applications (Seller Requests)
Endpoint	Method	Description
/api/v1/applications/apply/	POST	User applies to become a seller. Payload: user
/api/v1/applications/list/	GET	List all seller applications (Admin only)
/api/v1/applications/<pk>/approve/	POST	Admin approves application & assigns merchant ID
/api/v1/applications/<pk>/decline/	POST	Admin declines application with reason

Services
Endpoint	Method	Description
/api/v1/services/list/	GET	List all available services
/api/v1/services/<pk>/	GET	Get details of a single service
/api/v1/services/manage/	GET, POST	Seller manages own services
/api/v1/services/manage/<pk>/	PUT, DELETE	Update or delete a seller service

Orders
Endpoint	Method	Description
/api/v1/orders/create/	POST	Create a new order after PayPal payment. Payload: buyer, service, paypal_transaction_id, price_paid
/api/v1/orders/history/	GET	Get order history for logged-in user


Chatbot
Endpoint	Method	Description
/api/v1/chat/ask/	POST	Ask project-specific questions. Payload: {"message": "your question"}

the only questions allowed are: 

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


Frontend Setup
create new terminal, cd frontend, npm install

npm start