import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import News from "./pages/News/News";
import Main from "./pages/Main/Main";
import {ScrollArea} from '@mantine/core';

function App() {
    return (
        <ScrollArea w='100vw' h='100vh' >
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/news/:id" element={<News/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </ScrollArea>
    );
}

export default App;
