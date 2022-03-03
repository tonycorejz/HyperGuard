const MarketingBlock = ({posts}) => {
    return (
        <section className="marketing items-center display-flex">
            <div className="for-horizontal-scroll">
                <div className="for-div-marketing display-flex" id="scroll-for-blocks">
                    {
                        posts.map((post) => 
                            <div key={post.id} className="for-marketing items-center" style={{background: `url(${"/assets/img/lines_black.png"}), linear-gradient(180deg, ${post.color}E6 0%, ${post.color} 100%), url(${post.img})`}}>
                                <h3>{post.text}</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default MarketingBlock;