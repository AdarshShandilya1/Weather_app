import Image from "next/image"


const IconCard = (props) => {
  return (
    <div className="flex mx-4">
        <div className="mr-2">
        <Image src={props.img}
            width={40}
            height={15}
         />
        </div>
        
        <div className="flex flex-col">
            <h1>{props.txt}</h1>
            <h1>{props.val}</h1>
        </div>
    </div>
  )
}

export default IconCard