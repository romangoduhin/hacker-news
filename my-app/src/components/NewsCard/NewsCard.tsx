import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Group, Flex, Text, Card} from '@mantine/core';
import {IProps, NewsState} from "./NewsCard.type";
import {getNewsByIdThunk} from "../../redux/thunks";
import {NavLink} from "react-router-dom";
import {formatDate} from "../../helpers/formatDate";
import Loader from "../Loader/Loader";
import {setCurrentNews} from "../../redux/slices/newsSlice";
import {useAppDispatch} from "../../redux/hooks";

function NewsCard({index, id}: IProps) {
    const dispatch = useAppDispatch();

    const [news, setNews] = useState<NewsState>(null);

    function handleClick() {
        dispatch(setCurrentNews(news));
    }

    async function setNewsData() {
        const data = await getNewsByIdThunk(id);
        setNews(data)
    }

    useEffect(() => {
        setNewsData()
    }, [id]);

    return <Card p='0'
                 w='100%'
                 h='100px'
                 shadow="lg"
                 withBorder
                 bg="white"
                 sx={{
                     display: 'flex',
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     flexDirection: 'row',
                     '&:hover': {
                         backgroundColor: '#F8F9FA'
                     }
                 }}>
        {news ? <NavLink onClick={handleClick} to={`/news/${news.id}`}>
            <Group p='sm' w="80vw">
                <Avatar w="60px" h="60px" radius="xl">
                    <Text fz="lg" color="grape.9" fw={500}>{index + 1}</Text>
                </Avatar>

                <Flex
                    gap="lg"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                >
                    <Text fz="lg" fw={500}>{news.title}</Text>

                    <Group>
                        <Text fz="s">Author: {news.by}</Text>
                        <Divider orientation="vertical"/>
                        <Text fz="s"> {formatDate(news.time)}</Text>
                        <Divider orientation="vertical"/>
                        <Text fz="s"> {news.kids?.length}</Text>
                        <Divider orientation="vertical"/>
                        <Text fz="s"> {news.score} point</Text>
                    </Group>
                </Flex>
            </Group>
        </NavLink> : <Loader/>}
    </Card>
}

export default NewsCard;