"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import { apiService, type BlogPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const blogId = params["blog-id"] as string;
  const { t, currentLanguage } = useTranslations();
  
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const postData = await apiService.getBlogPost(blogId, currentLanguage);
        setBlogPost(postData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
        setBlogPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogPost();
    }
  }, [blogId, currentLanguage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <SearchModal />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-brown-secondary">{t('blog.loadingPosts')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen">
        <Header />
        <SearchModal />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Blog post not found'}</p>
            <Link href="/blogs">
              <Button>{t('blog.backToBlog')}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Blog Post Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blogs" className="inline-flex items-center text-brown-light hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blog.backToBlog')}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blogPost.title}
            </h1>
            <p className="text-lg md:text-xl text-brown-light mb-6">
              {blogPost.excerpt}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-brown-light text-sm">
              {blogPost.author && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blogPost.publishedAt)}</span>
              </div>
              {blogPost.category && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>{blogPost.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Featured Image */}
                {blogPost.featuredImage && (
                  <div className="mb-8">
                    <img
                      src={blogPost.featuredImage}
                      alt={blogPost.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                {blogPost.tags && blogPost.tags.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-brown-dark">{t('blog.tags')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-brown-primary/10 text-brown-primary text-sm px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-brown-dark">{t('blog.shareThisPost')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {t('blog.shareOnFacebook')}
                    </Button>
                    <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white">
                      {t('blog.shareOnTwitter')}
                    </Button>
                    <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                      {t('blog.shareOnLinkedIn')}
                    </Button>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-brown-secondary mb-2">{t('blog.needLegalAdvice')}</p>
                      <Button className="w-full bg-brown-primary hover:bg-brown-secondary text-white">
                        {t('blog.contactUs')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
