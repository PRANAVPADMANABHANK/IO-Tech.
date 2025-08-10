"use client";

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"
import { useBlogPosts } from "@/hooks/use-strapi-data";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";

export default function BlogsPage() {
  const { t, currentLanguage } = useTranslations();
  const { data: blogPosts, loading, error, refetch } = useBlogPosts(currentLanguage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Blogs Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
                <p className="mt-4 text-brown-secondary">{t('blog.loadingPosts')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-brown-primary text-white px-6 py-2 rounded-lg hover:bg-brown-secondary transition-colors"
                >
                  {t('blog.retry')}
                </button>
              </div>
            ) : blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/blogs/${post.slug}`}>
                    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                      <img
                        src={post.featuredImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-brown-dark mb-2 hover:text-brown-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-brown-secondary mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-brown-light">
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="text-brown-primary hover:text-brown-secondary font-medium transition-colors">
                            {t('blog.readMore')} →
                          </span>
                        </div>
                        {post.author && (
                          <p className="text-sm text-brown-light mt-2">
                            {t('blog.by')} {post.author}
                          </p>
                        )}
                        {post.category && (
                          <span className="inline-block bg-brown-primary/10 text-brown-primary text-xs px-2 py-1 rounded-full mt-2">
                            {post.category}
                          </span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-brown-secondary text-lg">{t('blog.noPostsAvailable')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
