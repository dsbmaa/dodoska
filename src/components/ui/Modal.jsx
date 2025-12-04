import { useEffect } from "react"
import { createPortal } from "react-dom"
 
export function Modal({ children, onClose }) {
    useEffect(() => {
        const handleEsc = e => {
            if(e.key === 'Escape') onClose()
        }
    
        window.addEventListener('keydown', handleEsc)

    return () => window.removeEventListener('keydown', handleEsc)
}, [onClose])

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                onClick={onClose}
                className="close-button"
                aria-label="close modal"
                >
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}