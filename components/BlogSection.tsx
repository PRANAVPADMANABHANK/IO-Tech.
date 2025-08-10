"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlogPosts } from "@/hooks/use-strapi-data";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const { t, currentLanguage } = useTranslations();
  const { data: blogPosts, loading, error, refetch } = useBlogPosts(currentLanguage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get only the latest 3 blog posts for the homepage
  const recentPosts = blogPosts.slice(0, 3);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-brown-secondary">{t('blog.loadingPosts')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={refetch}>{t('blog.retry')}</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            {t('blog.latestInsights')}
          </h2>
          <p className="text-lg text-brown-secondary max-w-3xl mx-auto leading-relaxed">
            {t('blog.latestInsightsSubtitle')}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {recentPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-brown-light mb-3">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-brown-dark mb-3 hover:text-brown-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-brown-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {post.category && (
                      <span className="inline-block bg-brown-primary/10 text-brown-primary text-xs px-3 py-1 rounded-full mb-4">
                        {post.category}
                      </span>
                    )}
                    
                    <div className="flex items-center text-brown-primary hover:text-brown-secondary font-medium transition-colors">
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brown-secondary text-lg">{t('blog.noPostsAvailable')}</p>
          </div>
        )}

        {/* View All Button */}
        {recentPosts.length > 0 && (
          <div className="text-center">
            <Link href="/blogs">
              <Button size="lg" className="bg-brown-primary hover:bg-brown-secondary text-white">
                {t('blog.viewAllPosts')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
