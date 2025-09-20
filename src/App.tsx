import { useState } from 'react'
import coverImage from './assets/cover.png'

function App() {
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [closeBlocked, setCloseBlocked] = useState(false)

  const handleCloseClick = () => {
    setShowCloseDialog(true)
  }

  const handleConfirmClose = () => {
    // Try to close the window. Browsers typically only allow this for windows opened by script.
    try {
      window.close()
    } catch (e) {
    }

    setTimeout(() => {
      if (!window.closed) {
        setShowCloseDialog(false)
        setCloseBlocked(true)
      }
    }, 150)
  }

  const handleCancelClose = () => {
    setShowCloseDialog(false)
  }

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start mt-4">
          <div className="window" style={{ width: "300px" }}>
            <div className="title-bar">
              <div className="title-bar-text">Work-in-Progress</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close" onClick={handleCloseClick}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Holup cutie let me cook!</p>
            </div>
          </div>
        </div>

        {showCloseDialog && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
            <div className="window pointer-events-auto" style={{ width: "250px" }}>
              <div className="title-bar">
                <div className="title-bar-text">Confirm Close</div>
              </div>
              <div className="window-body">
                <p>Are you sure you want to close the website?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={handleCancelClose}>Cancel</button>
                  <button onClick={handleConfirmClose}>Yes, Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {closeBlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="window pointer-events-auto" style={{ width: "320px" }}>
              <div className="title-bar">
                <div className="title-bar-text">Can't Close Tab</div>
              </div>
              <div className="window-body">
                <p>
                  The browser prevented the page from being closed by script.
                  You can try closing again or go to the homepage.
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setCloseBlocked(false)
                    }}
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      // Retry close attempt
                      try {
                        window.close()
                      } catch (e) {
                        // ignore
                      }
                    }}
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = '/'
                    }}
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App