global.MediaStream = jest.fn().mockImplementation(() => ({
    getAudioTracks: jest.fn().mockReturnValue([
        {
            stop: jest.fn(),
        },
    ]),
}));
