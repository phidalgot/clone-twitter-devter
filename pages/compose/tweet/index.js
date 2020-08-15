import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
// import { useState } from 'react'

const ComposeTweet = () => {
    // const [user, setUser] = useState()

    
function handleSumit(e) {
    e.preventDefault()
        
    }
    


  return (
    <>
      <AppLayout>
        <form onSubmit={handleSumit}>
          <textarea placeholder='¿Que esta pasando?'></textarea>
          <div>
            <Button>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height:200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
export default ComposeTweet
