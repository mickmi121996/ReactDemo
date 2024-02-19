from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProductDetailView, CategoryViewSet, ProductViewSet, ProductReviewViewSet, GetAllCategories, MyFavoriteProducts

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'productreviews', ProductReviewViewSet, basename='productreviews')

urlpatterns = [
  path('', include(router.urls)),
  path('get-all-categories', GetAllCategories.as_view()),
  path('my-favorite-products', MyFavoriteProducts.as_view()),
  path('my-favorite-products/<int:productid>', MyFavoriteProducts.as_view()),
  path('product/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
]
