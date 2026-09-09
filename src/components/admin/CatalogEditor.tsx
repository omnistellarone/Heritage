import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CatalogItem, CategoryType } from '../../types';
import { Plus, Edit2, CheckCircle, AlertTriangle, Package } from 'lucide-react';

export const CatalogEditor: React.FC = () => {
  const { catalog, addCatalogItem, updateCatalogItem } = useApp();
  const [activeTab, setActiveTab] = useState<CategoryType | 'all'>('all');
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState<Partial<CatalogItem>>({
    category: 'casket',
    name: '',
    subtitle: '',
    description: '',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: { material: 'Solid Wood', dimensions: 'Standard', interior: 'Velvet' }
  });

  const filteredCatalog = activeTab === 'all' 
    ? catalog 
    : catalog.filter(item => item.category === activeTab);

  const handleToggleStock = (item: CatalogItem) => {
    updateCatalogItem({
      ...item,
      inStock: !item.inStock
    });
  };

  const handleSaveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item: CatalogItem = {
      id: `${newItem.category}-${Date.now()}`,
      category: newItem.category as CategoryType,
      name: newItem.name,
      subtitle: newItem.subtitle || '',
      description: newItem.description || '',
      price: Number(newItem.price),
      imageUrl: newItem.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      inStock: newItem.inStock ?? true,
      specs: newItem.specs || {}
    };

    addCatalogItem(item);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Catalog Inventory & Pricing
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage caskets, plot tiers, and pallbearer service offerings available to families.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-medium border border-stone-200">
            {(['all', 'casket', 'plot', 'pallbearer'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-[#C5A059] text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab === 'all' ? 'All Inventory' : `${tab}s`}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#9B7B34] text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalog.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-xs flex flex-col justify-between ${
              !item.inStock ? 'opacity-75 border-amber-200 bg-amber-50/20' : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div>
              {/* Image & Category Tag */}
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                  {item.category}
                </div>
                <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm ${
                  item.inStock 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.inStock ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  <span>{item.inStock ? 'Available' : 'Out of Stock'}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{item.name}</h3>
                    <p className="text-xs text-[#C5A059] font-medium mt-0.5">{item.subtitle}</p>
                  </div>
                  <div className="font-mono text-base font-bold text-stone-900">
                    ${item.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="mt-4 pt-3 border-t border-stone-100 space-y-1 text-[11px] text-stone-500">
                  {Object.entries(item.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-stone-400">{key}:</span>
                      <span className="font-medium text-stone-700">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => handleToggleStock(item)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  item.inStock
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                Mark as {item.inStock ? 'Out of Stock' : 'In Stock'}
              </button>

              <span className="text-[10px] text-stone-400">
                {item.inStock ? 'Family can order' : 'Shows "Contact Director"'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto text-xs">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Add New Catalog Offering
            </h3>
            <p className="text-stone-500 mb-4">
              Add a new casket, burial plot, or pallbearer package to the inventory.
            </p>

            <form onSubmit={handleSaveNewItem} className="space-y-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={e => setNewItem({ ...newItem, category: e.target.value as CategoryType })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                >
                  <option value="casket">Casket</option>
                  <option value="plot">Burial Plot Tier</option>
                  <option value="pallbearer">Pallbearer Escort Package</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Item Title / Model Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Imperial Rose Mahogany"
                  value={newItem.name}
                  onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Subtitle / Material Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Hand-carved solid mahogany wood"
                  value={newItem.subtitle}
                  onChange={e => setNewItem({ ...newItem, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newItem.price}
                    onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Initial Stock Availability</label>
                  <select
                    value={newItem.inStock ? 'true' : 'false'}
                    onChange={e => setNewItem({ ...newItem, inStock: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  >
                    <option value="true">In Stock & Available</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newItem.imageUrl}
                  onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide details regarding craftsman quality, lining material, or plot location details..."
                  value={newItem.description}
                  onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] text-white rounded-xl hover:bg-[#9B7B34] font-medium shadow-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
