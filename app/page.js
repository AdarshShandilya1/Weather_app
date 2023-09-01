"use client"
import { useState, useEffect, useRef } from "react"
import IconCard from "./components/IconCard"
import Resilience from "@/public/resilience.png"
import Storm from "@/public/storm.png"
import visibility from "@/public/visibility.png"
import waterLevel from "@/public/water-level.png"
import windRose from "@/public/wind-rose.png"
import winds from "@/public/winds-weather-symbol.png"
import Humidity from "@/public/humidity.png"
import grass from "@/public/grass.png"
import {useRouter} from "next/navigation"

export default function Home() {
  const router = useRouter();
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false
      }
    }

    return true
  }
  const [weather, setWeather] = useState({})

  console.log(weather)
  async function getData(lat, long) {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2fed6055cb5b431e90f143142232408&q=${lat},${long}&aqi=yes`
    )
    return await data.json()
  }
  const successCallback = async (position) => {
    const result = await getData(
      position.coords.latitude,
      position.coords.longitude
    )
    setWeather({...result})
    console.log(result)
  }

  const errorCallback = (error) => {
    console.log(error)
  }
  
  useEffect(() => {
    const data = navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback
    )
    console.log(data)
  }, [])
  const[key, setKey] = useState(0)
  function handleDate(str) {
    var stringArray = str.split(/(\s+)/)
    return stringArray[2]
  }
  const [location, setLocation] = useState("")

  const locationData = async () => {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2fed6055cb5b431e90f143142232408&q=${location}&aqi=yes`,{
        cache: "no-store"
      }
    )
    return await data.json()
  }
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const res = await locationData()
    setWeather(res)
  }
  
  return (
    <div  className=" flex flex-col w-full h-screen bg-black relative pt-10 subpixel-antialiased  font-sans object-fill bg-[url(https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1https://unsplash.com/photos/OQsxdghBKrUwYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80)] bg-no-repeat bg-cover">
      <form onSubmit={handleSubmit} className="w-4/5 ml-auto mr-auto mb-4 font-sans opacity-80 flex">
        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Search for location" className=" outline-none w-10/12 p-4 h-full rounded-l-xl">

        </input>
        <button type="submit" className="w-2/12 h-full bg-black text-white rounded-r-xl">
          Search
        </button>
      </form>

      <div className=" h-80  bg-white text-black ml-auto mr-auto w-4/5 rounded-xl p-5 opacity-80 back text-opacity-100 ">
        <div className=" h-1/3 w-full rounded-t-xl flex  flex-col justify-center">
          <h1 className=" text-5xl text-center subpixel-antialiased mb-4 font-medium">
            {isEmpty(weather) ? "" : `${weather.location.name}`}
          </h1>
          <h1 className="text-center subpixel-antialiased">
            Weather Condition:{" "}
            {isEmpty(weather) ? "" : `${weather.current.condition.text}`}
          </h1>
        </div>
        <div className="w-full h-2/3  rounded-b-xl flex p-5">
          <div className="w-1/2 h-full  flex  flex-col justify-evenly">
            <h1 className="text-7xl  font-normal">
              {isEmpty(weather) ? "" : `${weather.current.temp_c}°`}
            </h1>
            <h1 className="text-l ">
              Feels Like:{" "}
              {isEmpty(weather) ? "" : `${weather.current.feelslike_c}°C`}
            </h1>
            <div className="flex justify-start">
              <h1 className=" text- mr-4">
                Low:{" "}
                {isEmpty(weather) ? "" : `${weather.current.feelslike_c}°C`}
              </h1>
              <h1>
                High:{" "}
                {isEmpty(weather) ? "" : `${weather.current.feelslike_c}°C`}
              </h1>
            </div>
          </div>
          <div className="w-1/2 h-full font-sans flex flex-col text-right justify-evenly">
            <h1>
              Latitude: {isEmpty(weather) ? "" : `${weather.location.lat}`}
            </h1>
            <h2>
              Longitude: {isEmpty(weather) ? "" : `${weather.location.lon}`}
            </h2>
            <h1>
              Time:{" "}
              {isEmpty(weather)
                ? ""
                : `${handleDate(weather.location.localtime)}`}
            </h1>
            <div className="flex justify-end">
              <h1 className="mr-4">
                State: {isEmpty(weather) ? "" : `${weather.location.region}`}
              </h1>
              <h1>
                Country: {isEmpty(weather) ? "" : `${weather.location.country}`}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-56 mt-5 ml-auto mr-auto relative flex justify-between">
        <div className="w-6/12 h-full bg-white rounded-xl mr-5 opacity-80 p-4">
          <div className="w-full h-1/2 flex flex-col">
            <div className="flex justify-between mb-auto mt-auto">
              <IconCard
                img={Humidity}
                txt="Humidity"
                val={isEmpty(weather) ? "" : `${weather.current.humidity}%`}
              />
              <IconCard
                img={Resilience}
                txt="Atm. Pressure"
                val={
                  isEmpty(weather) ? "" : `${weather.current.pressure_mb}hPa`
                }
              />
            </div>
          </div>

          <div className="w-full h-1/2 flex flex-col">
            <div className="flex justify-between mb-auto mt-auto">
              <IconCard img={waterLevel} txt="Sea Level" val="1000 hPa" />
              <IconCard img={grass} txt="Ground Level" val="977 hPa" />
            </div>
          </div>
        </div>
        <div className="w-6/12 h-full bg-white rounded-xl  opacity-80 p-4">
          <div className="w-full h-1/2  flex flex-col">
            <div className="flex justify-between mb-auto mt-auto">
              <IconCard
                img={winds}
                txt="Wind Speed"
                val={isEmpty(weather) ? "" : `${weather.current.wind_kph}Km/h`}
              />
              <IconCard
                img={windRose}
                txt="Wind Dir."
                val={
                  isEmpty(weather)
                    ? ""
                    : `${weather.current.wind_degree}° ${weather.current.wind_dir}`
                }
              />
            </div>
          </div>

          <div className="w-full h-1/2  flex flex-col">
            <div className="flex justify-between mb-auto mt-auto ">
              <IconCard
                img={Storm}
                txt="Wind Gust"
                val={isEmpty(weather) ? "" : `${weather.current.gust_kph} Km/h`}
              />
              <IconCard
                img={visibility}
                txt="Visibility"
                val={isEmpty(weather) ? "" : `${weather.current.vis_km} Km`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
