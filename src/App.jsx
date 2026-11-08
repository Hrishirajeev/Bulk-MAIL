
import { useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import './index.css'

function App() {

  const [msg, setmsg] = useState('')
  const [status, setstatus] = useState(false)
  const [emaillist, setemaillist] = useState([])

  // Getting message from textarea
  function handlemsg(event) {
    setmsg(event.target.value)
  }

  // Reading Excel file
  function handlefile(event) {

    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = function(event) {

      const data = event.target.result

      const workbook = XLSX.read(data, { type: 'binary' })

      console.log(workbook)

      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      const emaildata = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      console.log(emaildata)

      // Extracting email addresses from the first column
      const emailArray = emaildata
        .map(row => row[0])
        .filter(Boolean)

      setemaillist(emailArray)

      console.log(emailArray)
    }

    reader.readAsBinaryString(file)
  }

  // Sending bulk emails through backend API
  function send() {

    setstatus(true)

    axios.post('http://localhost:5000/sendmail', {
      msg: msg,
      emaillist: emaillist
    })
    .then(function(data) {

      if (data.data === true) {
        alert('Mail sent successfully')
      }
      else {
        alert('Mail not sent')
      }

    })
    .catch(function(error) {
      console.log(error)
      alert('Error in sending mail')
    })
    .finally(function() {
      setstatus(false)
    })
  }

  return (
    <div className="flex flex-col items-center w-full text-center">

      <div className="bg-blue-900 text-white text-center w-full">
        <h1 className="text-2xl font-bold px-5 py-3">
          BULK MAIL
        </h1>
      </div>

      <div className="bg-blue-800 text-white text-center w-full">
        <h1 className="font-bold px-5 py-3">
          We can help in sending multiple bulk emails
        </h1>
      </div>

      <div className="bg-blue-600 text-white text-center w-full">
        <h1 className="font-bold px-5 py-3">
          DRAG AND DROP YOUR EXCEL FILE HERE
        </h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3 w-full">

        <textarea
          onChange={handlemsg}
          value={msg}
          className="bg-white w-[80%] h-32 py-2 outline-none border border-black rounded-md"
          placeholder="Enter your email text here..."
        ></textarea>

        <input
          id="fileInput"
          type="file"
          accept=".xlsx,.xls"
          onChange={handlefile}
          className="text-center border border-dashed py-3 px-3 mt-4 mb-4"
        />

        <p>Total Emails In the files: {emaillist.length}</p>

        <button
          onClick={send}
          disabled={status || emaillist.length === 0}
          className="bg-green-500 mt-3 px-3 py-3 text-white font-bold rounded-md w-fit"
        >
          {status ? 'Sending...' : 'Send'}
        </button>

      </div>

      <div className="bg-blue-300 text-white text-center p-8 w-full"></div>

      <div className="bg-blue-200 text-white text-center p-8 w-full"></div>

    </div>
  )
}

export default App
