import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import './index.css'
import profile from '../../assets/profile.jpg'
import { useStore } from "@/store"
import { useContext } from "react"
import { UserContext } from "@/providers"
import { head } from "lodash"


export const Profile = () => {
    const {logoutUser} = useContext(UserContext)
    const {userInfo} = useStore(({userInfo}) => ({userInfo}))
    const info = head(userInfo)    

    return (
        <div className=" h-[100vh] w-full bg-[#F1F5F9]">
            <div className="flex w-full h-[70px] items-center justify-end bg-[#FFFFFF]">
                <Button onClick={logoutUser} className="mr-[34px] w-[272px] h-[44px] text-[#FAFAFA] leading-[56.25px] text-[18px] font-bold rounded-[6.33px]">Logout</Button>
            </div>
            <div className="flex justify-center">
                <Card className="w-[356px] h-[315px] mt-[95px] bg-[#FDFDFD] flex flex-col justify-between">
                    <CardHeader className="flex justify-center items-center gap-2 p-0 m-0 mt-[34px]">
                        <CardTitle className="text-xs font-semibold leading-3 text-[#2F2F2F]">Profile Picture</CardTitle>
                        <img src={info?.avatar ? info.avatar.image_medium_url : profile } alt="profile picture" className="h-[56px] w-[58px] rounded-[8px]" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <CardDescription className="text-sm font-normal leading-3 text-[#262626]">Your <span className="font-bold">Name</span></CardDescription>
                        <div className="bg-[#F4F4F4] h-[44px] rounded-[8px] flex items-center pl-[20.25px]" >
                            <p className="text-[#262626] leading-3 text-xs font-normal">{info?.name}</p>
                        </div>
                    </CardContent>
                    <CardContent className="flex flex-col gap-2">
                        <CardDescription className="text-sm font-normal leading-3 text-[#262626]">Your <span className="font-bold">E-mail</span></CardDescription>
                        <div className="bg-[#F4F4F4] h-[44px] rounded-[8px] flex items-center pl-[20.25px]" >
                            <p className="text-[#262626] leading-3 text-xs font-normal" >{info?.email}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}