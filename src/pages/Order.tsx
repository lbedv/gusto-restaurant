
import React, { useState, useEffect } from 'react';
import { Cart, CartItem } from '../services/cartService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PageHeader from '../components/layout/PageHeader';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from 'lucide-react';

// Import cart service functions
import { 
  getCart, 
  updateCartItemQuantity, 
  removeItemFromCart,
  clearCart,
  saveCart
} from '../services/cartService';

const OrderPage = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = getCart();
    setCart(loadedCart);
  }, []);
  
  // Update quantity
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedCart = updateCartItemQuantity(itemId, newQuantity);
    setCart(updatedCart);
  };
  
  // Remove item
  const handleRemoveItem = (itemId: number) => {
    const updatedCart = removeItemFromCart(itemId);
    setCart(updatedCart);
    toast.success('Položka byla odstraněna z košíku');
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if any
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = 'Vyplňte prosím své jméno';
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = 'Vyplňte prosím svůj email';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Zadejte platnou emailovou adresu';
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Vyplňte prosím své telefonní číslo';
    }
    
    if (!customerInfo.address.trim()) {
      errors.address = 'Vyplňte prosím svou adresu';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast.error('Košík je prázdný');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: cart.items,
        total: cart.total,
        customer: customerInfo
      };
      
      // Send this to a backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart
      const emptyCart = clearCart();
      setCart(emptyCart);
      
      // Reset form
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        note: ''
      });
      
      toast.success('Objednávka byla úspěšně odeslána!');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Došlo k chybě při zpracování objednávky');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Empty cart message
  if (cart.items.length === 0) {
    return (
      <>
        <PageHeader 
          title="Objednávka" 
          description="Vytvořte si vlastní objednávku z našeho menu"
          backgroundImage="/images/order-header.jpg"
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <ShoppingCart className="mx-auto h-16 w-16 text-restaurant-300" />
              <h2 className="text-2xl font-semibold text-restaurant-900 mt-4">
                Váš košík je prázdný
              </h2>
              <p className="text-gray-600 mt-2 mb-8">
                Prohlédněte si naše menu a přidejte položky do košíku
              </p>
              <Link 
                to="/menu" 
                className="inline-flex items-center px-6 py-3 rounded-lg btn-primary"
              >
                Přejít na menu
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return (
    <>
      <PageHeader 
        title="Objednávka" 
        description="Vytvořte si vlastní objednávku z našeho menu"
        backgroundImage="/images/order-header.jpg"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-restaurant-900 mb-6">Váš košík</h2>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 space-y-4">
                  {cart.items.map((item) => (
                    <div 
                      key={item.menuItem.id} 
                      className="flex items-center pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      <div className="h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={item.menuItem.image} 
                          alt={item.menuItem.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.menuItem.name}</h3>
                          <span className="font-bold">{item.menuItem.price} Kč</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Control */}
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleQuantityChange(item.menuItem.id, item.quantity - 1)}
                              className="text-restaurant-600 hover:text-restaurant-800 focus:outline-none"
                              aria-label="Snížit množství"
                            >
                              <MinusCircle size={20} />
                            </button>
                            
                            <span className="mx-3 w-6 text-center">{item.quantity}</span>
                            
                            <button 
                              onClick={() => handleQuantityChange(item.menuItem.id, item.quantity + 1)}
                              className="text-restaurant-600 hover:text-restaurant-800 focus:outline-none"
                              aria-label="Zvýšit množství"
                            >
                              <PlusCircle size={20} />
                            </button>
                          </div>
                          
                          {/* Total & Remove */}
                          <div className="flex items-center">
                            <span className="mr-4 font-medium">
                              {item.menuItem.price * item.quantity} Kč
                            </span>
                            <button 
                              onClick={() => handleRemoveItem(item.menuItem.id)}
                              className="text-restaurant-600 hover:text-restaurant-800 focus:outline-none"
                              aria-label="Odstranit položku"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        {item.specialRequests && (
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">Poznámka:</span> {item.specialRequests}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-restaurant-50 p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Celkem</span>
                    <span className="text-xl font-bold text-restaurant-800">{cart.total} Kč</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Včetně DPH</p>
                </div>
              </div>
            </div>
            
            {/* Customer Info Form */}
            <div>
              <h2 className="text-2xl font-bold text-restaurant-900 mb-6">Vaše údaje</h2>
              <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Jméno a příjmení *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
                        ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Jan Novák"
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
                        ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="jan.novak@example.com"
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
                        ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="+420 123 456 789"
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresa doručení *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400
                        ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ulice, číslo popisné, město, PSČ"
                      required
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                      Poznámka k objednávce
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={customerInfo.note}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-400"
                      placeholder="Případné speciální požadavky k objednávce..."
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-medium rounded-lg transition-colors ${
                      isSubmitting 
                        ? 'bg-restaurant-400 cursor-not-allowed' 
                        : 'bg-restaurant-600 hover:bg-restaurant-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Odesílání...' : 'Dokončit objednávku'}
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  * Označená pole jsou povinná
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
