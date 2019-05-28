import React, { Component } from 'react';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '04630df46b8e2f14c467',
      clientSecret: 'f13d8695cc8f8be76000442780b9d435602d8939',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    console.log(this.props);
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    return (
      <div ref='myRef'>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        <div className='card card-body mb-2'>
          {repos.map(repo => (
            <div key={repo.name} className='row'>
              <div className='col-md-6'>
                <h4>
                  <a href={repo.html_url} className='text-info' target='_blank'>
                    {' '}
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div className='col-md-6'>
                <span className='badge badge-info mr-1'>
                  Stars: {repo.stargazers_count}
                </span>
                <span className='badge badge-secondary mr-1'>
                  Watchers: {repo.watchers}
                </span>
                <span className='badge badge-success'>Forks: {repo.forks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Github;
