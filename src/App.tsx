import { ThemeProvider } from "./components/theme-provider"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {useState, FormEvent, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import validate from './validate';

function App() {
  const [response, setResponse] = useState('');
  const [formData, setFormData] = useState<FormData>();
  
  const [errors, setErrors] = useState({
      title: '',
      tags: '',
      description: '',
      authentication_key: '',
      thumbnail_image: '',
      source_file: ''
  });

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
  };

 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let elements = e.target.elements;
    console.log(typeof(elements));
    let formdata = new FormData(e.target);
    console.log(formdata);

   
    let validationErrors = validate(elements);
   
    
    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
        alert("Form Submitted successfully")
    }

  }

  useEffect(() => {
    // define an async function to make the API call
    const fetchData = async () => {
      try {
        // use axios.get to make a GET request to the endpoint
        const url = "https://example.com/api";
        const response = await axios.post(url, formData);
        // set the data state with the response data
        setResponse(response.data);
      } catch (err) {
        // set the error state with the error message
        setErrors(err.message);
      }
    };
    // invoke the async function
    fetchData();
  }, []); // pass an empty array as the second argument to run only once




  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" main-container h-screen flex items-center justify-center">
      
        <form className=" bg-[#242e4c] bg-opacity-95 h-[90%] w-[90%] flex flex-col items-center justify-center space-y-8"
          onSubmit={handleSubmit}>
          <p className=" text-4xl">Upload Files</p>
          
          <div className=" flex flex-row space-x-8 justify-center items-start w-full">
            <div className=" w-[25%] space-y-4">
              <div>

                <Label>Authentication Key</Label>
                <Input required name="authenticationKey" onChange={handleChange}  placeholder="Authentication Key" className=" bg-transparent" />
                {errors.authentication_key && <span className="text-pink-300">{errors.authentication_key}</span>}  
              </div>
              <div>
                <Label>Title</Label>
                <Input required name="title" onChange={handleChange}  placeholder="Title" className=" bg-transparent" />
                {errors.title && <span className="text-pink-300">{errors.title}</span>}  
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" onChange={handleChange}  placeholder="Description" className=" bg-transparent" />
                {errors.description && <span className="text-pink-300">{errors.description}</span>}  
              </div>
            </div>
            <div className=" w-[25%] space-y-4">
              <div>
                <Label>Tags (comma separated)</Label>
                <Input required name="tags" onChange={handleChange}  placeholder="Tags (comma separated)" className=" bg-transparent" />
                {errors.tags && <span className="text-pink-300">{errors.tags}</span>}  
              </div>
              <div>
                <Label>Date</Label>
                <Input required name="date" onChange={handleChange}  placeholder="DD/MM/YYYY" type="date" className=" bg-transparent" />
              </div>
              <div>
                <Label>Software</Label>
                <Select required name="software">
                  <SelectTrigger className=" bg-transparent">
                    <SelectValue placeholder="Sketch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className=" flex flex-row">
                <div>
                  <Label>Thumbnail Image</Label>
                  <Input required name="thumbnail_image" onChange={handleChange}  type="file" className=" bg-transparent" />
                  {errors.thumbnail_image && <span className="text-pink-300">{errors.thumbnail_image}</span>}  
                </div>
                <div>
                  <Label>Source File</Label>
                  <Input required name="source_file" onChange={handleChange} type="file" required className=" bg-transparent" />
                  {errors.source_file && <span className="text-pink-300">{errors.source_file}</span>}  
                </div>
              </div>
            </div>
          </div>
          <Button className=" bg-gradient-to-r from-[#f073c7] to-[#ff6b96] text-white w-[20%] justify-center items-center">Submit</Button>
         
        </form>
      
      </div>
    </ThemeProvider>
  )
}

export default App;