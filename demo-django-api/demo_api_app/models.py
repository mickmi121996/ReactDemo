from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=100, verbose_name="nom")

    def __str__(self):
        return '({}) {} - {}'.format(self.id, self.code, self.name)

    class Meta:
        ordering = ('code',)
        verbose_name = "catégorie"

class Product(models.Model):
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=100, verbose_name="nom")
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT, verbose_name="catégorie")

    def __str__(self):
        return '({}) {} - {}'.format(self.id, self.code, self.name)

    class Meta:
        ordering = ('code',)
        verbose_name = "produit"

class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return '({}) ({} {}) - {}'.format(self.id, self.user.first_name, self.user.last_name, self.product.name)

class FavoriteProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="utilisateur")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="produit")

    def __str__(self):
        return '({}) ({} {}) - {}'.format(self.id, self.user.first_name, self.user.last_name, self.product.name)

    class Meta:
        verbose_name = "produit favori"
        verbose_name_plural = "produits favoris"
