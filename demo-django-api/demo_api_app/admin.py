from django.contrib import admin
from demo_api_app.models import Category, Product, FavoriteProduct

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(FavoriteProduct)
