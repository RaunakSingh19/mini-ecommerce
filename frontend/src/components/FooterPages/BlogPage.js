import React from 'react';
import './BlogPage.css';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Sustainable Bag Design',
      excerpt: 'Discover how we incorporate sustainability into every step of our design process.',
      date: 'May 15, 2025',
      category: 'Sustainability',
      image: '/images/blog-sustainable-design.jpg'
    },
    {
      id: 2,
      title: 'Top Travel Bags for Your Next Adventure',
      excerpt: 'Our curated selection of the best travel bags for different types of travelers.',
      date: 'April 28, 2025',
      category: 'Travel',
      image: '/images/blog-travel-bags.jpg'
    },
    {
      id: 3,
      title: 'Behind the Scenes: Our Craftsmanship Process',
      excerpt: 'A look at how our skilled artisans create each Addison bag with precision and care.',
      date: 'March 10, 2025',
      category: 'Craftsmanship',
      image: '/images/blog-craftsmanship.jpg'
    },
    {
      id: 4,
      title: 'How to Choose the Perfect Work Bag',
      excerpt: 'Professional tips for selecting a bag that fits your work style and needs.',
      date: 'February 22, 2025',
      category: 'Lifestyle',
      image: '/images/blog-work-bag.jpg'
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Addison Blog</h1>
        <p>Discover the latest stories about our products, sustainability efforts, and lifestyle tips</p>
      </div>

      <div className="blog-categories">
        <button className="category-btn active">All Articles</button>
        <button className="category-btn">Sustainability</button>
        <button className="category-btn">Travel</button>
        <button className="category-btn">Lifestyle</button>
        <button className="category-btn">Craftsmanship</button>
      </div>

      <div className="blog-posts">
        {blogPosts.map(post => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">Read More →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="blog-newsletter">
        <h3>Never Miss a Post</h3>
        <p>Subscribe to our newsletter for the latest blog updates and exclusive content</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;