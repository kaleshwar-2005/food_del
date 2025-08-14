import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = (props) => {
    const { setShowLogin } = props;
    const [currentState, setCurrentState] = useState('Sign Up')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('') // Clear error when user types
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            // Basic validation
            if (currentState === 'Sign Up' && !formData.name.trim()) {
                throw new Error('Name is required')
            }
            if (!formData.email.trim()) {
                throw new Error('Email is required')
            }
            if (!formData.password.trim()) {
                throw new Error('Password is required')
            }
            if (formData.password.length < 6) {
                throw new Error('Password must be at least 6 characters')
            }
            
            // Simulate API call (replace with actual authentication)
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            if (currentState === 'Sign Up') {
                console.log('Sign up successful:', formData)
                alert('Account created successfully!')
            } else {
                console.log('Login successful:', formData)
                alert('Login successful!')
            }
            
            // Close popup after successful action
            setShowLogin(false)
            setFormData({ name: '', email: '', password: '' })
            
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleStateChange = (newState) => {
        setCurrentState(newState)
        setFormData({ name: '', email: '', password: '' })
        setError('')
    }
    
    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="login-popup-input">
                    {currentState === 'Login' ? null : (
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Your name' 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Your email' 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Your password' 
                        value={formData.password}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : (currentState === 'Sign Up' ? 'Create account' : 'Login')}
                </button> 
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                
                <div className="login-popup-switch">
                    {currentState === 'Login' ? (
                        <p>Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => handleStateChange('Login')}>Login here</span></p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginPopup
