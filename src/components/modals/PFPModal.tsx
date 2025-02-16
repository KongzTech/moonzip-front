import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon'
import CloseIcon from '@/assets/icons/CloseIcon'
import Button from '@/components/Button'
import {ModalType, useModalStore} from '@/store/modalStore'
import {useQuery} from 'react-query'
import {getOwnedNFTs} from '@/api/user/getOwnedNFTs.ts'
import {useWallet} from '@solana/wallet-adapter-react'
import {useState} from "react";
import {handleCreateProfile} from "@/api/user/upsertUserProfile.ts";
import {getUserInfo} from "@/api/user/getUserProfile.ts";

export default function PFPModal() {
    const closeModal = useModalStore(
        (state: { closeModal: () => void }) => state.closeModal
    )
    const openModal = useModalStore(
        (state: { openModal: (modal: ModalType) => void }) => state.openModal
    )
    const {publicKey} = useWallet()
    const walletAddress = publicKey?.toBase58() || ''
    const [page, setPage] = useState(1)
    const [selectedNftId] = useState<string | null>(null)

    const {data: userInfo} = useQuery(
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

    const {data: response, refetch: refetchListNFTs, isFetching} = useQuery(
        ['ownedNFTs', walletAddress, page],
        async () => {
            if (!walletAddress) {
                return {total: 0, limit: 10, page: 1, items: []};
            }

            const response = await getOwnedNFTs({
                ownerAddress: walletAddress,
                page: page,
                limit: 10,
            });

            return response?.result || {total: 0, limit: 10, page: 1, items: []};
        },
        {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
        }
    );

    const listNFTs = response?.items;
    const totalPages = Math.ceil((response?.total || 0) / (response?.limit || 10));

    const handlePageClick = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            refetchListNFTs();
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[200]'>
            <div
                className='md:w-[324px] w-full bg-dark-800 rounded-t-[20px] md:rounded-[20px] p-6 flex flex-col items-center md:relative absolute bottom-0'>
                <button
                    onClick={closeModal}
                    className='absolute right-6 top-6 text-light-100 icn-white-hover'
                >
                    <CloseIcon/>
                </button>
                <button
                    onClick={() => openModal('profile')}
                    className='absolute left-6 top-6 text-light-100 icn-white-hover'
                >
                    <ChevronLeftIcon/>
                </button>

                <div className='w-full text-center mb-6'>
                    <h2 className='text-light-0 text-xl font-bold font-barlow mb-3'>
                        Profile Picture
                    </h2>
                    <p className='text-light-100 text-sm font-medium font-ibm-sans'>
                        Choose your pfp wisely, anon
                    </p>
                </div>

                <form className='w-full'>
                    <div className='flex flex-col gap-2 mb-6'>
                        <div className='grid grid-cols-3 gap-4'>
                            {isFetching ? (
                                <div className='text-light-100'>Loading...</div>
                            ) : listNFTs && listNFTs?.length > 0 ? (
                                listNFTs.map((nft, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleCreateProfile(userInfo?.username || '', walletAddress, nft?.id)}
                                        className={`p-4 border hover:opacity-80 hover:bg-dark-750 cursor-pointer border-dark-700 flex items-center justify-center rounded-xl ${selectedNftId === nft?.id ? 'bg-dark-750' : ''}`}>
                                        {nft?.content?.links?.image ? (
                                            <img
                                                src={nft.content.links.image}
                                                alt='NFT Image'
                                                width={80}
                                                height={80}
                                                className='rounded-lg'
                                            />
                                        ) : (
                                            <div className='text-light-100'>No Image</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className='text-light-100 text-center w-full'>No NFT selected</div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mb-4">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`w-5 h-5 flex items-center justify-center rounded-full 
                                    ${page === index + 1 ? "bg-purple-600 text-white" : "bg-dark-700 text-light-100"}
                                    hover:bg-purple-500 transition-colors duration-200`}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                            onClick={closeModal}>
                        Create Profile
                    </Button>
                </form>
            </div>
        </div>
    )
}
