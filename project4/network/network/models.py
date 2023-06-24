from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Post(models.Model):
    content = models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"'Post '{self.content}' posted by {self.user}, timestamp: {self.timestamp}"   
    

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post")
    liker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liker")
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.post} liked by {self.liker}, timestamp: {self.timestamp}"
    

class Follower(models.Model):
    followed = models.ManyToManyField(User, null=True, blank=True, related_name="followed")
    follower = models.ManyToManyField(User, null=True, blank=True, related_name="follower")
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.followed} followed by {self.follower}, timestamp: {self.timestamp}"
    

