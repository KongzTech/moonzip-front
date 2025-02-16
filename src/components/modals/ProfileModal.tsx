import ChevronRightIcon from '@/assets/icons/ChevronRightIcon'
import CloseIcon from '@/assets/icons/CloseIcon'
import Button from '@/components/Button'
import Input from '@/components/Input'
import {useModalStore} from '@/store/modalStore'
import {useUserStore} from '@/store/userStore'
import {useWallet} from '@solana/wallet-adapter-react'
import {upsertUserInfo} from "@/api/user/upsertUserProfile.ts"
import {useQuery} from "react-query"
import {getUserInfo} from "@/api/user/getUserProfile.ts"
import PFPPlaceholderIcon from "@/assets/icons/PFPPlaceholderIcon.tsx";
import {useEffect, useState} from "react";

export default function ProfileModal() {
    const closeModal = useModalStore(state => state.closeModal)
    const openModal = useModalStore(state => state.openModal)
    const [isLoading, setIsLoading] = useState(false)
    const {publicKey} = useWallet()
    const walletAddress = publicKey?.toBase58() || ''
    const moonHandle = useUserStore(state => state.moonHandle)
    const setMoonHandle = useUserStore(state => state.setMoonHandle)

    const {data: userInfo, refetch: refetchUserInfo} = useQuery(
        ["userInfo", walletAddress],
        async () => {
            if (!walletAddress) return
            return await getUserInfo(walletAddress)
        },
        {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
        }
    )

    useEffect(() => {
        if (walletAddress) {
            refetchUserInfo();
        }
    }, [refetchUserInfo, walletAddress]);

    const handleCreateProfile = async (username: string) => {
        if (!walletAddress) {
            alert("Wallet address")
            return;
        }

        setIsLoading(true)
        try {
            const requestData = {
                walletAddress,
                username: username,
                displayValue: "",
                nftAddress: '',
            }

            await upsertUserInfo(requestData)
            await refetchUserInfo()

            alert("Profile updated successfully!")
            closeModal()
        } catch (error) {
            console.error("Failed to update profile:", error)
            alert("Failed to update profile. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className='fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-[200]'
            onClick={e => {
                if (e.target === e.currentTarget) {
                    closeModal()
                }
            }}
        >
            <div
                className='md:w-[324px] w-full relative bg-dark-800 rounded-t-[20px] md:rounded-[20px] p-6 flex flex-col items-center'>
                <button onClick={closeModal} className='absolute right-6 top-6 text-light-100 icn-white-hover'>
                    <CloseIcon/>
                </button>

                {/* Content */}
                <div className='w-full text-center mb-6'>
                    <h2 className='text-light-0 text-xl font-bold font-barlow mb-3'>Profile</h2>
                    <p className='text-light-100 text-sm font-medium font-ibm-sans'>
                        Set up your profile so everyone knows who's winning
                    </p>
                </div>

                {/* Form */}
                <form className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-light-100 text-sm font-semibold font-ibm-mono uppercase'>
                            Selected pfp</label>
                        <div
                            className='w-full p-4 border hover:opacity-80 hover:bg-dark-750 cursor-pointer border-dark-700 flex items-center gap-3 rounded-xl mb-6'
                            onClick={() => openModal('pfp')}
                        >
                            {userInfo?.imageUrl ? (
                                <img
                                    src={userInfo.imageUrl}
                                    alt='Profile'
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            ) : (
                                <PFPPlaceholderIcon/>
                            )}
                            <div
                                className='text-light-100 flex-1 text-sm font-medium font-ibm-sans flex flex-col gap-0.5'>
                                Undeads
                                <div className='text-light-0 text-sm font-semibold font-ibm-mono'>Moon Cadet</div>
                            </div>
                            <ChevronRightIcon/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-light-100 text-sm font-semibold font-ibm-mono uppercase'>
                            Moon handle
                        </label>
                        <Input
                            value={moonHandle}
                            onChange={e => setMoonHandle(e.target.value)}
                            placeholder={userInfo?.username || `@ ${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`}
                            className='w-full mb-5'
                        />
                    </div>

                    <Button
                        className='w-full'
                        onClick={() => handleCreateProfile(moonHandle)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Create Profile"}
                    </Button>

                </form>
            </div>
        </div>
    )
}
