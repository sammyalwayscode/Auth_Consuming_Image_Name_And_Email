import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Input } from 'antd'
import './Register.css'
import TextArea from 'antd/lib/input/TextArea';
import { app } from '../Firebase/Base'

const db = app.firestore()
const newUser = app.firestore().collection("users")
function Register() {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  // const [photoFileURL, setphotoFileURL] = useState(null)
  const [hasAccount, setHasAccount] = useState(false)
  const [current, setCurrent] = useState(null)
  const [collectFiles, setcollectFiles] = useState([])


  // const uploadImage = async (e) => {
  //   const file = e.target.files[0]
  //   const fileRef = app.storage().ref()
  //   const storageRef = fileRef.child(file.name)
  //   await storageRef.put(file)
  //   setphotoFileURL(await storageRef.getDownloadURL())
  // }


  const handleLogin = () => {
    app.auth().signInWithEmailAndPassword(email, password)
  }

  const handleSignUp = async () => {
    const bestUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password)
    // app.auth().currentUser.updateProfile({
    //   displayName: name
    // })

    await newUser.doc(bestUser.user.uid).set({
      name,
      password,
      email,
      bio
      // avatar: await photoFileURL
    })

  }

  const getData = async () => {
    await newUser
      .onSnapshot((snap) => {
        const item = []
        snap.forEach((doc) => {
          item.push(doc.data())
        })
        setcollectFiles(item)
      })

  }

  useEffect(() => {
    getData()
  }, [])




  // useEffect(() => {
  //   app.auth().onAuthStateChanged((user) => {
  //     setCurrent(user)
  //   })
  // }, [])

  // console.log(current)


  return (
    <div>
      <div className='GeneralLoginDiv'>
        <div className='SubGeneralLoginDiv'>
          <div className='ContentHold'>
            <div>
              {hasAccount ? (
                <>
                  <div style={{ width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>



                    {/* <div style={{ color: '#ddd' }}>Upload Image</div>
                    <Input
                      onClick={uploadImage}
                      className='InputDiv'
                      type='file'
                      autoFocus
                      required
                      value={photoFileURL}
                      onChange={(e) => setphotoFileURL(e.target.value)}
                    /> */}


                    <div style={{ color: '#ddd' }}>Name</div>
                    <Input
                      className='InputDiv'
                      placeholder='Name'
                      type='name'
                      autoFocus
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div style={{ color: '#ddd' }}>UserName</div>
                    <Input
                      className='InputDiv'
                      placeholder='Email'
                      type='email'
                      autoFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <p style={{ color: 'red', fontSize: '11px' }}> {emailError} </p> */}
                    <div style={{ color: '#ddd' }}>Password</div>
                    <Input
                      className='InputDiv'
                      placeholder='Password'
                      type='password'
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div style={{ color: '#ddd' }}>Short Bio</div>
                    <TextArea
                      className='InputDiv'
                      placeholder='Short Bio'
                      type='text'
                      value={bio}
                      required
                      onChange={(e) => setBio(e.target.value)}
                    />


                    {/* <p style={{ color: 'red', fontSize: '11px' }}> {passwordError} </p> */}
                    <Button onClick={handleSignUp} style={{ color: '#fff', fontWeight: 'bold', backgroundColor: '#4081ec' }}>Sign Up</Button>
                    <p style={{ color: '#ddd' }}>Have An Account ? <span onClick={() => setHasAccount(!hasAccount)} style={{ color: 'yellow', cursor: 'pointer' }}>Sign In</span></p>

                    <div>
                      {collectFiles.map(({ name, password, email, bio }) => (
                        <h1> {name} </h1>
                        // <h2> {email} </h2>
                        // <p> {bio} </p>
                      ))

                      }
                    </div>

                    <div>
                      {
                        current && <center>
                          <h2 style={{ color: '#fff' }}> {current.displayName} </h2>
                          <h4 style={{ color: '#fff' }}> {current.email} </h4>
                          <img src={current.photoURL} alt='' style={{ height: '100px', width: '100px', borderRadius: '100px', objectFit: 'cover', backgroundColor: 'darkcyan' }} />
                        </center>
                      }
                    </div>


                  </div>
                </>
              ) : (
                <>
                  <div style={{ width: '300px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ color: '#ddd' }}>UserName</div>
                    <Input
                      className='InputDiv'
                      placeholder='Email'
                      type='email'
                      autoFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <p style={{ color: 'red', fontSize: '11px' }}> {emailError} </p> */}
                    <div style={{ color: '#ddd' }}>Password</div>
                    <Input
                      className='InputDiv'
                      placeholder='Password'
                      type='password'
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <p style={{ color: 'red', fontSize: '11px' }}> {passwordError} </p> */}
                    <Button onClick={handleLogin} style={{ color: '#fff', fontWeight: 'bold', backgroundColor: '#4081ec' }}>Sign In</Button>
                    <p style={{ color: '#ddd' }}>Don't Have An Account ? <span onClick={() => setHasAccount(!hasAccount)} style={{ color: 'lightGreen', cursor: 'pointer' }} >Sign Up</span></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
