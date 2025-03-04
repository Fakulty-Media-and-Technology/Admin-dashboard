'use client'

import React, { useEffect, useState } from 'react'
import { ISeason } from './components/UploadComponent'
import Image from 'next/image'
import useToggle from '@/hooks/useToggle';
import { roboto_400, roboto_500 } from '@/config/fonts';
import { AppButton, CustomInput } from '@/components/AppLayout';
import ReactPlayer from 'react-player';
import { truncateText } from '@/utilities/textUtils';
import { LinkViewProps } from '@/types/packages';
import { isValidUrl, normalizeUrl, transformResponse } from '@/utilities/linkUtils';
import { toast } from 'react-toastify';
import { getPreview } from '@/app/server';
import { ImageProps } from '@/app/plans/ClientComponent';
import EpisodeComponent from './components/EpisodeComp';
import { IEpisodeData, ISeasonData } from '@/types/api/content.type';
import { seriesButtonValidity } from '@/api/contentSlice';


interface Props {
    season: ISeasonData
    handleFunc?: () => void
}
function SeasonComponent({ season, handleFunc }: Props) {
    const [showSelect, setShowSelect] = useState(false);
    const [isViewEp, setIsViewEp] = useState<string>('');
    const sortedEpisodes = season.episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
    const [episodeArray, setEpisodeArray] = useState<IEpisodeData[]>([...sortedEpisodes])
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const lastItem = sortedEpisodes[sortedEpisodes.length - 1]
    const emptyEpisode: IEpisodeData = {
        _id: `${(sortedEpisodes.length > 0 && lastItem.episodeNumber) ? lastItem.episodeNumber + 1 : 1}`,
        admin: '',
        season: '',
        episodeNumber: (sortedEpisodes.length > 0 && lastItem.episodeNumber) ? lastItem.episodeNumber + 1 : 1,
        title: '',
        description: '',
        trailer: '',
        video: ''
    }



    async function handleDisableButton() {
        const res = await seriesButtonValidity(season._id, 'episodes');
        if (res.ok && res.data) setDisabled(false)
    }

    useEffect(() => {
        handleDisableButton();
    }, [season])



    return (
        <div style={{ backfaceVisibility: "hidden" }} className={`relative z-0 overflow-y-hidden ${!showSelect && 'h-[65px]'}`}>
            <div className='bg-black3'>
                <div className={`w-full px-10 lg:px-16 flex items-center gap-x-6 ${season.serial_number % 2 !== 0 ? 'bg-black3' : 'bg-[#D9D9D91A]'} py-5 transition-all duration-300 z-[9999999]`}>
                    <button onClick={() => setShowSelect(!showSelect)}>
                        <Image
                            src={showSelect ? '/colorDropDwn.svg' : "/bigDown.svg"}
                            width={19}
                            height={13}
                            alt=""
                            className={!showSelect ? "-rotate-90 transition-all duration-300" : "rotate-0 transition-all duration-300"}
                        />
                    </button>

                    <span className={`${roboto_400.className} text-base ${showSelect ? 'text-[#F8A72D]' : 'text-white'} font-medium`}>SEASON {season.serial_number}</span>
                </div>
            </div>

            <div className={`px-10 -mt-2 relative -z-[10] space-y-6 transition-all duration-300 ${showSelect ? 'translate-y-0 mb-6' : '-translate-y-[650px]'}`}>
                {showSelect && <AppButton
                    title={`Add New Episode`}
                    className='mt-6 px-10 ml-10 lg:ml-16'
                    onClick={() => setEpisodeArray(prev => ([...prev, emptyEpisode]))}
                    bgColor={(isDisabled) ? 'bg-gray-500' : 'bg-green_400'}
                />}

                {/* Episodes array */}
                {episodeArray.map((episode, index) => {
                    if (episode === null) return
                    return <EpisodeComponent
                        key={index}
                        episode={episode}
                        seasonId={season._id}
                        handleFunc={handleFunc}
                        setIsViewEp={setIsViewEp}
                        isViewEp={isViewEp}
                    />
                })}
            </div>
        </div>
    )
}

export default SeasonComponent