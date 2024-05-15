import { ProfileForm } from "@/packages/form"
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
import './index.css'
import logo from '../../assets/b2bit.png'


export const SingInPage = () => {
    return (
        <div className="shadow-box rounded-[18px]">
            <Card className="w-[438px] min-h-[534px] rounded-[18px]">
                <CardHeader className="flex items-center pt-[65.59px] pb-[46px]">
                    <img src={logo} className="w-[309.6px]"/>
                </CardHeader>
                <CardContent>
                    <ProfileForm/>
                </CardContent>
            </Card>
        </div>
    )
}