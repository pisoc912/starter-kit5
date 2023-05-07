const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
      children: [
        {
          title: 'Test',
          path: '/home/test',
        }]
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
      children: [
        {
          title: 'Talent Pool',
          path: '/second-page/talentpool',
        },
        {
          title: 'Candidates',
          path: '/second-page/candidates',
        },
        {
          title: 'Details',
          path: '/second-page/details',
        },
      ]

    }, {
      title: 'Third Page',
      path: '/third-page',
      icon: 'mdi:email-outline',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
