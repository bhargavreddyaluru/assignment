import toast, {Toaster} from 'react-hot-toast'
import './index.css'

const notify = () =>
  toast('Here is your toast.', {
    duration: 100,
    position: 'top-center',
    className: 'success-toast',
  })

const ToastApp = props => {
  const {APIStatus} = props
  console.log(APIStatus)
  const notification = () =>
    toast(APIStatus, {
      duration: 1000,
      className: 'notification',
      position: 'top-center',
    })
  return (
    <div>
      <button type="button" onClick={notification}>
        Make me a toast
      </button>
    </div>
  )
}

export default ToastApp
