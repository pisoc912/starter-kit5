// import { API, Storage } from 'aws-amplify'
// import React from 'react'
// import { useState } from 'react'
// import awsmobile from 'src/aws-exports'

// import AWS from 'aws-sdk'

// AWS.config.region = 'us-west-2'; // 区域
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-west-2:9c7203d7-a182-47fd-9e6c-edd06e1190f3',
// });

// const UploadImage = () => {
//   const [img, setImg] = useState('')

//   const handleChange = (e) => {
//     const file = e.target.files[0]
//     console.log(file);

//     const addImageToDB = async (image) => {
//       try {
//         await API.graphql(graphqlOperation(createPicture, { input: image }))
//       } catch (error) {
//         console.log(error)
//       }
//     }

//     Storage.put(file.name, file, {
//       contentType: 'image/png'
//     }).then((result) => {
//       setImg({ file: URL.createObjectURL(file) })
//       console.log(result)

//       const image = {
//         name: file.name,
//         file: {
//           bucket: awsmobile.aws_user_files_s3_bucket,
//           region: awsmobile.aws_user_files_s3_bucket_region,
//           key: 'public/' + file.name
//         }
//       }
//       addImageToDB(image)
//       console.log('add completed')
//     })
//       .catch(err => console.log(err));
//   }

//   return (
//     <div>
//       <div>
//         <p>please select an image to upload!</p>
//         <input type="file" onChange={(event) => handleChange(event)} />
//       </div>
//       <div>
//         <img alt='img' src={img.file} />
//       </div>

//     </div>
//   )
// }

// export default UploadImage
