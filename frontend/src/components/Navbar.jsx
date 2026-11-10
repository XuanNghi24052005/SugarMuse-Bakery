import React, { useState, useMemo } from 'react'
import '../componentStyles/Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useSelector } from 'react-redux'
import UserDashBoard from '../UserAuthentication/UserDashBoard'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All')
    const [selectedPriceFilter, setSelectedPriceFilter] = useState('All')

    const { isAuthenticated, user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const { products = [] } = useSelector(state => state.product)

    const location = useLocation()
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search)
    const activeCategory = searchParams.get('category')?.toLowerCase() || ''

    const categories = ["All", "Cake", "Pastry", "Savory", "Combo"]
    const priceRanges = [
        { label: "All Prices", value: "All" },
        { label: "Under $30", value: "under30" },
        { label: "$30 - $60", value: "30to60" },
        { label: "Over $60", value: "over60" }
    ]

    const filteredLiveProducts = useMemo(() => {
        if (!products) return []
        let list = [...products]

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            list = list.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.subcategory?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            )
        }

        if (selectedCategoryFilter !== 'All') {
            list = list.filter(p =>
                p.category?.toLowerCase() === selectedCategoryFilter.toLowerCase()
            )
        }

        if (selectedPriceFilter === 'under30') {
            list = list.filter(p => Number(p.price) < 30)
        } else if (selectedPriceFilter === '30to60') {
            list = list.filter(p => Number(p.price) >= 30 && Number(p.price) <= 60)
        } else if (selectedPriceFilter === 'over60') {
            list = list.filter(p => Number(p.price) > 60)
        }

        return list.slice(0, 6)
    }, [products, searchQuery, selectedCategoryFilter, selectedPriceFilter])

    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault()
        const params = new URLSearchParams()
        if (searchQuery.trim()) params.set('keyword', searchQuery.trim())
        if (selectedCategoryFilter !== 'All') params.set('category', selectedCategoryFilter.toLowerCase())

        if (selectedPriceFilter === 'under30') {
            params.set('maxPrice', '30')
        } else if (selectedPriceFilter === '30to60') {
            params.set('minPrice', '30')
            params.set('maxPrice', '60')
        } else if (selectedPriceFilter === 'over60') {
            params.set('minPrice', '60')
        }

        const queryString = params.toString()
        navigate(queryString ? `/products?${queryString}` : '/products')
        setIsSearchOpen(false)
    }

    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCategoryFilter('All')
        setSelectedPriceFilter('All')
    }

    return (
        <header className="mocha-header navbar-fixed">
            <Link to="/" className="mocha-logo" onClick={() => setIsMenuOpen(false)}>
                Sugar Muse
            </Link>
            <nav className={`mocha-nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link
                    to="/products?category=cake"
                    className={activeCategory === 'cake' ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Cake
                </Link>
                <Link
                    to="/products?category=pastry"
                    className={activeCategory === 'pastry' ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Pastry
                </Link>
                <Link
                    to="/products?category=savory"
                    className={activeCategory === 'savory' ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Savory
                </Link>
                <Link
                    to="/products?category=combo"
                    className={activeCategory === 'combo' ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Combo
                </Link>
            </nav>

            <div className="mocha-actions">
                <div className="search-container">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
                        {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
                    </button>
                </div>

                <Link to="/cart" className="mocha-cart-btn" aria-label="Cart">
                    <ShoppingCartOutlinedIcon />
                    {cartItems && cartItems.length > 0 && (
                        <span className="mocha-cart-badge">{cartItems.length}</span>
                    )}
                </Link>

                {isAuthenticated && user ? (
                    <UserDashBoard user={user} />
                ) : (
                    <Link to="/login" aria-label="Log in">
                        <AccountCircleOutlinedIcon />
                    </Link>
                )}

                <button className="mocha-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* EXPANDABLE ADVANCED SEARCH & FILTER OVERLAY */}
            {isSearchOpen && (
                <div className="search-filter-overlay">
                    <form className="search-overlay-form" onSubmit={handleSearchSubmit}>
                        <div className="search-overlay-input-group">
                            <SearchIcon className="search-overlay-icon" />
                            <input
                                type="text"
                                className="search-overlay-input"
                                placeholder="Search products by name, category, or description..."
                                value={searchQuery}
                                autoFocus
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button type="button" className="search-overlay-clear" onClick={() => setSearchQuery('')}>
                                    ✕
                                </button>
                            )}
                            <button type="submit" className="search-overlay-submit-btn">
                                Search
                            </button>
                        </div>

                        {/* FILTERS SECTION IN OVERLAY */}
                        <div className="search-overlay-filters">
                            <div className="filter-group">
                                <span className="filter-group-title">Category:</span>
                                <div className="filter-chips">
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat}
                                            className={`filter-chip ${selectedCategoryFilter === cat ? 'active' : ''}`}
                                            onClick={() => setSelectedCategoryFilter(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <span className="filter-group-title">Price Range:</span>
                                <div className="filter-chips">
                                    {priceRanges.map((pr) => (
                                        <button
                                            type="button"
                                            key={pr.value}
                                            className={`filter-chip ${selectedPriceFilter === pr.value ? 'active' : ''}`}
                                            onClick={() => setSelectedPriceFilter(pr.value)}
                                        >
                                            {pr.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {(searchQuery || selectedCategoryFilter !== 'All' || selectedPriceFilter !== 'All') && (
                                <button type="button" className="reset-overlay-filters-btn" onClick={resetFilters}>
                                    Reset Filters
                                </button>
                            )}
                        </div>

                        {/* LIVE MATCHING PRODUCT PREVIEW */}
                        {filteredLiveProducts.length > 0 && (
                            <div className="search-live-results">
                                <div className="search-live-header">
                                    <span>Matching Products ({filteredLiveProducts.length})</span>
                                    <button type="submit" className="view-all-link-btn">
                                        View All ({filteredLiveProducts.length}) →
                                    </button>
                                </div>
                                <div className="search-live-grid">
                                    {filteredLiveProducts.map((p) => (
                                        <Link
                                            to={`/product/${p._id}`}
                                            key={p._id}
                                            className="search-live-item"
                                            onClick={() => setIsSearchOpen(false)}
                                        >
                                            <img src={p.image?.[0]?.url || '/images/tshirt-white.jpg'} alt={p.name} />
                                            <div className="search-live-info">
                                                <h4>{p.name}</h4>
                                                <p>${Number(p.price).toFixed(2)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </header>
    )
}

export default Navbar