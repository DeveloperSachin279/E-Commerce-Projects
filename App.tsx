import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  Search, 
  X, 
  ArrowRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Heart,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Minus,
  Trash2,
  PlayCircle
} from 'lucide-react';
import { Product, CartItem, PageView, User, FilterState } from './types';
import { INITIAL_PRODUCTS, CATEGORIES } from './constants';
import AIAssistant from './components/AIAssistant';

// --- Shared Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'yellow' }> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg",
    secondary: "bg-white text-gray-900 hover:bg-gray-100 shadow-sm",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    yellow: "bg-brand-yellow text-gray-900 hover:bg-yellow-300 shadow-lg",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  bgColor?: string, 
  onClick: (p: Product) => void,
  onAddToCart: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean
}> = ({ product, bgColor = 'bg-white', onClick, onAddToCart, onToggleWishlist, isWishlisted }) => (
  <div 
    onClick={() => onClick(product)}
    className={`group relative rounded-3xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-2 ${bgColor} hover:shadow-xl`}
  >
    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white mb-4 relative">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      {/* Hover Action */}
      <button 
        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
        className="absolute bottom-4 right-4 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-10 hover:bg-brand-yellow hover:text-black"
      >
        <Plus className="w-5 h-5" />
      </button>
      {/* Wishlist */}
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
      </button>
    </div>
    
    <div className="px-2">
       <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-brand-blue transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
       </div>
       <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">{product.category}</p>
       <div className="font-bold text-xl text-gray-900">
         {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
       </div>
    </div>
  </div>
);

// --- Page Components ---

const Header: React.FC<{
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  setIsCartOpen: (isOpen: boolean) => void;
  user: User | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}> = ({ setCurrentPage, cartCount, setIsCartOpen, user, searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-yellow shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('HOME')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
           <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-brand-yellow font-bold text-xl">A</span>
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">Akash Interio</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Search for sofas, beds..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full py-3 pl-6 pr-12 focus:outline-none shadow-sm text-sm font-medium placeholder-gray-400"
          />
          <button className="absolute right-2 top-1.5 p-1.5 bg-brand-yellow rounded-full hover:bg-yellow-300 transition">
            <Search className="w-4 h-4 text-gray-900" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-yellow-500 rounded-full transition">
            <Search className="w-5 h-5 text-gray-900" />
          </button>

          <button 
            onClick={() => user ? setCurrentPage('PROFILE') : setCurrentPage('LOGIN')}
            className="p-2 hover:bg-yellow-500 rounded-full transition"
          >
            <UserIcon className="w-5 h-5 text-gray-900" />
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition shadow-md group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-yellow font-bold">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="lg:hidden ml-2" onClick={() => setIsMenuOpen(true)}>
             <Menu className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-[80%] bg-white p-8 shadow-2xl rounded-l-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-2xl">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex flex-col gap-6">
              {['HOME', 'SHOP', 'ABOUT', 'CONTACT'].map((page) => (
                <button 
                  key={page} 
                  onClick={() => { setCurrentPage(page as PageView); setIsMenuOpen(false); }}
                  className="text-left text-xl font-bold hover:text-brand-blue transition-colors"
                >
                  {page.charAt(0) + page.slice(1).toLowerCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ setCurrentPage: (page: PageView) => void }> = ({ setCurrentPage }) => (
  <footer className="bg-gray-100 py-12 mt-12 rounded-t-[3rem]">
    <div className="container mx-auto px-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm mb-12">
        <div className="max-w-md">
           <h3 className="text-2xl font-bold mb-2">Join the Club</h3>
           <p className="text-gray-500">Subscribe for exclusive designs and offers.</p>
        </div>
        <div className="flex-1 w-full max-w-md flex gap-2">
           <input type="email" placeholder="Email address" className="flex-1 bg-gray-100 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-brand-blue" />
           <Button variant="primary" className="!px-6">Subscribe</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
         <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                 <span className="font-bold text-black">A</span>
               </div>
               <span className="font-bold text-xl">Akash Interio</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">Designing your dream home with elegance and comfort.</p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-yellow hover:text-black transition shadow-sm">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
         </div>

         <div>
           <h4 className="font-bold mb-4">Shop</h4>
           <ul className="space-y-2 text-sm text-gray-500">
             <li><button onClick={() => setCurrentPage('SHOP')} className="hover:text-brand-blue">All Products</button></li>
             <li><button onClick={() => setCurrentPage('SHOP')} className="hover:text-brand-blue">New Arrivals</button></li>
           </ul>
         </div>

         <div>
           <h4 className="font-bold mb-4">Company</h4>
           <ul className="space-y-2 text-sm text-gray-500">
             <li><button onClick={() => setCurrentPage('ABOUT')} className="hover:text-brand-blue">About Us</button></li>
             <li><button onClick={() => setCurrentPage('CONTACT')} className="hover:text-brand-blue">Contact</button></li>
           </ul>
         </div>

         <div>
           <h4 className="font-bold mb-4">Contact</h4>
           <ul className="space-y-3 text-sm text-gray-500">
             <li className="flex items-start gap-3">
               <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0" />
               <span>2 Aakash furniture, Kolar road, Bhopal (M.P)</span>
             </li>
             <li className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
               <span>9111092001, 9977518856</span>
             </li>
             <li className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
               <span>lodhiakash286@gmail.com</span>
             </li>
           </ul>
         </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Akash Interio. All rights reserved.
      </div>
    </div>
  </footer>
);

const HomePage: React.FC<{
  setCurrentPage: (page: PageView) => void;
  products: Product[];
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}> = ({ setCurrentPage, products, onProductClick, onAddToCart, onToggleWishlist, wishlist }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="bg-brand-blue rounded-b-[3rem] pt-8 pb-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-white mb-10 md:mb-0">
           <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6">
             Premium Collection 2025
           </div>
           <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
             Design Your <br/> Dream Home.
           </h1>
           <p className="text-lg text-blue-50 mb-8 max-w-md font-medium">
             Explore our curated collection of luxury furniture that combines comfort with modern aesthetics.
           </p>
           <div className="flex gap-4">
             <Button variant="yellow" onClick={() => setCurrentPage('SHOP')}>Shop Now</Button>
             <button 
               onClick={() => {
                   const el = document.getElementById('collections');
                   el?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="flex items-center gap-2 text-white font-bold hover:text-yellow-300 transition"
             >
               <PlayCircle className="w-10 h-10" />
               <span>Watch Video</span>
             </button>
           </div>
        </div>
        <div className="md:w-1/2 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 rounded-full blur-3xl"></div>
           <img 
             src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000" 
             alt="Hero Chair" 
             className="relative z-10 w-full rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-700 animate-float object-cover" 
           />
           <div className="absolute -bottom-6 -left-6 bg-brand-pink text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold shadow-lg z-20 animate-bounce">
              <span className="text-2xl">50%</span>
              <span className="text-xs">OFF</span>
           </div>
        </div>
      </div>
      
      {/* Decor Circles */}
      <div className="absolute top-20 right-20 w-8 h-8 bg-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-40 left-10 w-4 h-4 bg-white rounded-full opacity-30"></div>
    </section>

    {/* Bento Grid Categories */}
    <section id="collections" className="container mx-auto px-6 -mt-10 relative z-20 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Large Card (Yellow) */}
        <div 
           onClick={() => setCurrentPage('SHOP')}
           className="md:col-span-2 bg-yellow-100 rounded-[2rem] p-8 relative overflow-hidden h-80 cursor-pointer group hover:shadow-xl transition-all"
        >
           <div className="relative z-10 max-w-[60%]">
             <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Living Room</span>
             <h3 className="text-3xl font-bold text-gray-900 mb-4">Comfort Meets Style.</h3>
             <Button variant="primary" className="text-sm px-4 py-2 h-auto">Explore</Button>
           </div>
           <img 
             src="https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600" 
             className="absolute right-[-20px] top-10 w-2/3 h-full object-cover rounded-tl-3xl shadow-lg group-hover:scale-105 transition-transform duration-500"
             alt="Sofa"
           />
        </div>

        {/* Tall Card (Blue) */}
        <div 
          onClick={() => setCurrentPage('SHOP')}
          className="md:row-span-2 bg-sky-100 rounded-[2rem] p-8 relative overflow-hidden h-[30rem] cursor-pointer group hover:shadow-xl transition-all"
        >
           <div className="relative z-10">
             <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Decor</span>
             <h3 className="text-3xl font-bold text-gray-900 mb-4">Minimalist Accents.</h3>
           </div>
           <img 
             src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600" 
             className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3/4 object-cover rounded-t-3xl shadow-lg group-hover:-translate-y-2 transition-transform duration-500"
             alt="Lamp"
           />
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <Button variant="secondary" className="text-xs">Shop Decor</Button>
           </div>
        </div>

        {/* Small Card (Pink) - BEIGE TUFTED BED */}
        <div 
           onClick={() => setCurrentPage('SHOP')}
           className="bg-rose-100 rounded-[2rem] p-6 relative overflow-hidden h-80 cursor-pointer group hover:shadow-xl transition-all"
        >
           <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Bedroom</span>
           <h3 className="text-2xl font-bold text-gray-900 mb-4">Cozy Vibes.</h3>
           <img 
             src="https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&q=80&w=800" 
             className="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover rounded-tl-3xl shadow-md group-hover:scale-110 transition-transform duration-500"
             alt="Beige Tufted Bed"
           />
        </div>

        {/* Small Card (Gray) - UPDATED TO WHITE WARDROBE */}
        <div 
           onClick={() => setCurrentPage('SHOP')}
           className="md:col-span-2 bg-gray-100 rounded-[2rem] p-8 flex items-center justify-between cursor-pointer group hover:shadow-xl transition-all"
        >
           <div>
             <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">New Arrivals</span>
             <h3 className="text-3xl font-bold text-gray-900 mb-6">Latest <br/>Collection</h3>
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-brand-yellow transition-colors">
               <ArrowRight className="w-5 h-5" />
             </div>
           </div>
           <img 
             src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600" 
             className="w-1/2 h-48 object-cover rounded-2xl shadow-sm rotate-6 group-hover:rotate-0 transition-transform"
             alt="Wardrobe"
           />
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
         <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Popular Picks</h2>
              <p className="text-gray-500">Customer favorites from this month.</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentPage('SHOP')} className="hidden sm:flex">View All</Button>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {products.slice(0, 4).map((product, idx) => (
             <ProductCard 
              key={product.id} 
              product={product} 
              bgColor={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white border border-gray-100'} 
              onClick={onProductClick}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
           ))}
         </div>
         
         <div className="mt-12 text-center sm:hidden">
            <Button variant="outline" onClick={() => setCurrentPage('SHOP')} className="w-full">View All</Button>
         </div>
      </div>
    </section>

    {/* Features Bar */}
    <section className="py-12 bg-brand-yellow/10 mx-6 rounded-[2rem]">
       <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-around gap-8">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'To Kolar Road & Nearby' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% Secure Transaction' },
              { icon: Star, title: 'Premium Quality', desc: 'Certified Materials' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-gray-900 shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
         </div>
       </div>
    </section>
  </div>
);

const ShopPage: React.FC<{
  products: Product[];
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}> = ({ products, onProductClick, onAddToCart, onToggleWishlist, wishlist }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    minPrice: 0,
    maxPrice: 200000,
    sortBy: 'popularity'
  });
  
  const filteredProducts = products
    .filter(p => filters.category === 'All' || p.category === filters.category)
    .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating; 
    });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Shop Header */}
      <div className="bg-brand-blue pt-12 pb-24 rounded-b-[3rem] px-6 mb-12">
         <div className="container mx-auto">
           <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Shop Collection</h1>
         </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-10">
         {/* Filters Bar */}
         <div className="bg-white rounded-[2rem] p-6 shadow-lg mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    filters.category === cat 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-gray-500">Sort by:</span>
               <select 
                 className="bg-gray-100 rounded-full px-4 py-2 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
                 value={filters.sortBy}
                 onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
               >
                 <option value="popularity">Popularity</option>
                 <option value="price-asc">Price: Low to High</option>
                 <option value="price-desc">Price: High to Low</option>
               </select>
            </div>
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredProducts.map((product) => (
             <ProductCard 
                key={product.id} 
                product={product} 
                bgColor="bg-white" 
                onClick={onProductClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
             />
           ))}
         </div>

         {filteredProducts.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             <p>No furniture found. Try adjusting filters.</p>
           </div>
         )}
      </div>
    </div>
  );
};

const ProductDetailsPage: React.FC<{
  product: Product | null;
  setCurrentPage: (page: PageView) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
}> = ({ product, setCurrentPage, onAddToCart, onToggleWishlist, wishlist }) => {
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       <div className="bg-gray-200 h-64 rounded-b-[3rem]"></div>
       
       <div className="container mx-auto px-6 -mt-40 relative z-10">
         <button 
           onClick={() => setCurrentPage('SHOP')} 
           className="mb-6 flex items-center gap-2 text-sm font-bold bg-white px-4 py-2 rounded-full w-fit shadow-sm hover:bg-gray-100 transition"
         >
           ← Back to Shop
         </button>

         <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 bg-gray-100 p-8 md:p-12 flex items-center justify-center relative">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-auto object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500" 
               />
               <div className="absolute top-8 left-8 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                 {product.category}
               </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
               <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                  <button onClick={() => onToggleWishlist(product.id)} className="p-2 bg-gray-50 rounded-full hover:bg-red-50 transition">
                    <Heart className={`w-6 h-6 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
               </div>

               <div className="flex items-center gap-4 mb-8">
                 <span className="text-3xl font-bold text-brand-blue">
                   {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                 </span>
                 <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-bold text-sm">
                   <Star className="w-4 h-4 fill-current" />
                   {product.rating} Rating
                 </div>
               </div>

               <div className="prose mb-8 text-gray-600">
                 <p>{product.description}</p>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50 p-4 rounded-2xl">
                   <h4 className="font-bold text-sm mb-1 text-gray-900">Materials</h4>
                   <p className="text-sm text-gray-500">{product.materials.join(', ')}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl">
                   <h4 className="font-bold text-sm mb-1 text-gray-900">Dimensions</h4>
                   <p className="text-sm text-gray-500">{product.dimensions}</p>
                 </div>
               </div>

               <div className="mt-auto flex gap-4">
                 <div className="flex items-center bg-gray-100 rounded-full px-4">
                   <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-black">-</button>
                   <span className="font-bold text-lg w-8 text-center">1</span>
                   <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-black">+</button>
                 </div>
                 <Button 
                   onClick={() => onAddToCart(product)} 
                   className="flex-1"
                   variant="primary"
                 >
                   Add to Cart
                 </Button>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="min-h-screen bg-gray-50 pb-20">
    <div className="bg-brand-pink h-64 rounded-b-[3rem] mb-12 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white">Contact Us</h1>
    </div>
    
    <div className="container mx-auto px-6 -mt-32">
      <div className="bg-white rounded-[3rem] shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
             <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue"><MapPin /></div>
                 <div>
                   <p className="font-bold text-gray-900">Address</p>
                   <p className="text-gray-500">2 Aakash furniture, Kolar road, Bhopal (M.P)</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600"><Phone /></div>
                 <div>
                   <p className="font-bold text-gray-900">Phone</p>
                   <p className="text-gray-500">9111092001, 9977518856</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-brand-pink"><Mail /></div>
                 <div>
                   <p className="font-bold text-gray-900">Email</p>
                   <p className="text-gray-500">lodhiakash286@gmail.com</p>
                 </div>
               </div>
             </div>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
             <input type="text" placeholder="Name" className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-blue" />
             <input type="email" placeholder="Email" className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-blue" />
             <textarea rows={4} placeholder="Message" className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-blue resize-none"></textarea>
             <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage: React.FC<{
  setUser: (u: User) => void;
  setCurrentPage: (p: PageView) => void;
}> = ({ setUser, setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
     <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">A</div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Please enter your details.</p>
        
        <div className="space-y-4 mb-8">
          <input type="email" placeholder="Email" className="w-full bg-gray-50 rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-brand-yellow" />
          <input type="password" placeholder="Password" className="w-full bg-gray-50 rounded-xl px-6 py-3 outline-none focus:ring-2 focus:ring-brand-yellow" />
        </div>
        
        <Button onClick={() => { setUser({id: '1', name: 'Admin', email: 'admin@akash.com', role: 'admin'}); setCurrentPage('HOME'); }} className="w-full">
          Sign In
        </Button>
        <p className="text-xs text-gray-400 mt-4">Demo: Click Sign In for Admin Access</p>
     </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  // Global State
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('PRODUCT_DETAILS');
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
      <Header 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        setIsCartOpen={setIsCartOpen}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-2xl flex flex-col h-full rounded-l-3xl overflow-hidden my-2 mr-2">
              <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Cart ({cart.length})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-medium">Your cart is empty.</p>
                    <button onClick={() => { setIsCartOpen(false); setCurrentPage('SHOP'); }} className="mt-4 text-brand-blue font-bold hover:underline">Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{item.name}</h3>
                           <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">
                             {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)}
                          </span>
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-xl font-bold">
                       {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(cartTotal)}
                    </span>
                  </div>
                  <Button className="w-full" onClick={() => { setIsCartOpen(false); setCurrentPage('CHECKOUT'); }}>
                    Checkout Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        {currentPage === 'HOME' && (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            products={products}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {currentPage === 'SHOP' && (
          <ShopPage 
            products={products}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {currentPage === 'PRODUCT_DETAILS' && (
          <ProductDetailsPage 
            product={selectedProduct}
            setCurrentPage={setCurrentPage}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {currentPage === 'CART' && <div className="py-32 text-center text-gray-500">Use the cart icon to view items.</div>}
        {currentPage === 'CHECKOUT' && (
           <div className="min-h-screen bg-gray-50 py-20 px-6">
             <div className="container mx-auto max-w-3xl">
               <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
               <div className="bg-white rounded-[2rem] p-8 shadow-lg text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-8">Thank you for your order. We will contact you at <strong>9111092001</strong> shortly.</p>
                  <Button onClick={() => setCurrentPage('HOME')}>Continue Shopping</Button>
               </div>
             </div>
           </div>
        )}
        {currentPage === 'LOGIN' && <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} />}
        {currentPage === 'ADMIN' && (
            <div className="min-h-screen bg-gray-50 py-20 px-6">
              <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="bg-white rounded-[2rem] p-8 shadow-lg">
                   <p className="text-gray-500">Manage products here...</p>
                   <div className="mt-8 border-t pt-8">
                      <h3 className="font-bold mb-4">Quick Stats</h3>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-blue-50 p-6 rounded-2xl">
                            <span className="text-3xl font-bold text-brand-blue">{products.length}</span>
                            <p className="text-gray-500 text-sm">Products</p>
                         </div>
                         <div className="bg-yellow-50 p-6 rounded-2xl">
                            <span className="text-3xl font-bold text-yellow-600">12</span>
                            <p className="text-gray-500 text-sm">Pending Orders</p>
                         </div>
                         <div className="bg-green-50 p-6 rounded-2xl">
                            <span className="text-3xl font-bold text-green-600">₹45k</span>
                            <p className="text-gray-500 text-sm">Revenue</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
        )}
        {currentPage === 'CONTACT' && <ContactPage />}
        {currentPage === 'ABOUT' && (
           <div className="py-20 container mx-auto px-6 text-center max-w-4xl">
             <h1 className="text-5xl font-bold mb-8">Our Story</h1>
             <p className="text-xl text-gray-500 leading-relaxed mb-12">
               Akash Interio is dedicated to transforming houses into homes. With a focus on quality craftsmanship and modern design, we bring you furniture that stands the test of time.
             </p>
             <div className="h-64 bg-gray-200 rounded-[3rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Workshop" />
             </div>
           </div>
        )}
        {currentPage === 'PROFILE' && (
           <div className="py-40 container mx-auto text-center">
             <div className="w-24 h-24 bg-brand-yellow rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
               {user?.name.charAt(0)}
             </div>
             <h1 className="text-4xl font-bold mb-2">Hello, {user?.name}</h1>
             <p className="text-gray-500 mb-8">{user?.email}</p>
             <Button onClick={() => { setUser(null); setCurrentPage('HOME'); }} variant="outline">Sign Out</Button>
           </div>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <AIAssistant products={products} />
    </div>
  );
};

export default App;