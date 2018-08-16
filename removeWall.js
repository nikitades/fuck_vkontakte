async function removeWall(indicator) {
    const localWallInform = wallInform.bind(null, indicator);
    const myData = await req('users.get');
    const myId = myData[0].id;
    let offset = 0;
    let postsRemoved = 0;
    for (; ;) {
        const posts = await req('wall.get', {
            count: 100,
            offset
        });
        if (posts.items.length === 0) break;
        for (let n in posts.items) {
            const post = posts.items[n];
            await req('wall.delete', {
                owner_id: myId,
                post_id: post.id
            }, undefined, undefined, 'big');
            postsRemoved++;
            localWallInform('Удалено постов: ' + postsRemoved + (postsRemoved > 100 ? ' !!!Рекомендую перезапустить, а то бывает что посты перестают удаляться' : ''));
        }
        offset += posts.items.length;
    }
    localWallInform('Все посты удалены!');
    await helpers.wait(1000);
}

function wallInform(indicator, text, id) {
    indicator.innerText = text;
    if (!!id) {

    }
}