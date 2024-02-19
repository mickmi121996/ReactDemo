from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets

from demo_api_app.models import Category, Product, FavoriteProduct, ProductReview
from demo_api_app.serializers import \
  CategorySerializer, \
  ProductSerializer, \
  ProductReviewSerializer


class CategoryViewSet(ModelViewSet):
  permission_classes = [IsAuthenticatedOrReadOnly]
  queryset = Category.objects.all().order_by('name')
  serializer_class = CategorySerializer
  http_method_names = ['get']


class ProductViewSet(ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Product.objects.all().order_by('name')
  serializer_class = ProductSerializer
  http_method_names = ['get', 'put']
  
# views.py

class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        product_id = self.request.query_params.get('product')
        if product_id is not None:
            queryset = queryset.filter(product_id=product_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


class GetAllCategories(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  http_method_names = ['get']

  def get(self, request):
    categories = Category.objects.all().order_by('name')
    return Response(categories.values(), status=status.HTTP_200_OK)


class MyFavoriteProducts(APIView):
  permission_classes = [IsAuthenticated]
  http_method_names = ['get', 'post', 'delete']

  def get(self, request):
    product_ids = FavoriteProduct.objects.filter(user=request.user).values('product_id')
    products = Product.objects.filter(id__in=product_ids)
    return Response(products.values(), status=status.HTTP_200_OK)
  
  def post(self, request):
    product_id = request.data

    product = get_object_or_404(Product, id=product_id)
    favoriteProduct = FavoriteProduct.objects.filter(user=request.user, product=product).first()
    if (favoriteProduct is None):
      favoriteProduct = FavoriteProduct(
        user = request.user,
        product = product
      )
      favoriteProduct.save()

    product_serializer = ProductSerializer(product)
    return Response(product_serializer.data, status=status.HTTP_201_CREATED)
  
  def delete(self, request, productid=None):
    favoriteProducts = FavoriteProduct.objects.filter(user=request.user, product_id=productid)
    favoriteProducts.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
