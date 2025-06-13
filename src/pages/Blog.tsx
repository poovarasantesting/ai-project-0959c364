import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    excerpt: "Learn the fundamentals of HTML, CSS, and JavaScript to begin your journey in web development.",
    date: "April 20, 2025",
    author: "Jane Doe",
    category: "Development",
    tags: ["HTML", "CSS", "JavaScript", "Beginners"],
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt: "Dive deep into React Hooks and how they revolutionize state management in functional components.",
    date: "April 15, 2025",
    author: "John Smith",
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Responsive Design Best Practices",
    excerpt: "Master the art of responsive web design to create websites that work beautifully on all devices.",
    date: "April 10, 2025",
    author: "Alex Johnson",
    category: "Design",
    tags: ["CSS", "Responsive", "Mobile", "Design"],
    imageUrl: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Introduction to TypeScript",
    excerpt: "Discover how TypeScript improves your JavaScript development with static typing and advanced features.",
    date: "April 5, 2025",
    author: "Sam Wilson",
    category: "Development",
    tags: ["TypeScript", "JavaScript", "Development"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Building RESTful APIs",
    excerpt: "Learn how to design and implement RESTful APIs for your web applications.",
    date: "April 1, 2025",
    author: "Taylor Reed",
    category: "Backend",
    tags: ["API", "REST", "Backend", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop",
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the latest insights, tutorials, and news about web development, design, and technology.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Card key={post.id} className="flex flex-col h-full overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="hover:text-primary cursor-pointer">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                By {post.author}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}