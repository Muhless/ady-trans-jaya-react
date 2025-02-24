import React from 'react'
import { ToastContainer } from 'react-toastify'

function ToastNotification() {
  return (
          <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
  )
}

export default ToastNotification
