<% if $OpenGraphTitle %>
    <meta itemprop="name" content="$OpenGraphTitle">
    <meta property="og:title" content="$OpenGraphTitle">
    <meta name="twitter:title" content="$OpenGraphTitle">
<% end_if %>

<% if $OGDescription %>
    <meta itemprop="description" content="$OGDescription">
    <meta property="og:description" content="$OGDescription">
    <meta name="twitter:description" content="$OGDescription">
<% end_if %>

<meta property="og:site_name" content="$SiteConfig.Title">
<meta property="og:type" content="website">
<meta property="og:url" content="$AbsoluteLink">
<link rel="canonical" href="$AbsoluteLink">

<% if $OpenGraphImage %>
    <meta property="og:image" content="$OpenGraphImage.ScaleWidth(1200).AbsoluteLink">
    <meta property="og:image:secure_url" content="$forceSecure($OpenGraphImage.ScaleWidth(1200).AbsoluteLink)">
    <meta property="og:image:type" content="$OpenGraphImage.MimeType">
    <meta property="og:image:alt" content="$OpenGraphImage.Title">
    <meta property="twitter:image" content="$forceSecure($OpenGraphImage.ScaleWidth(1200).AbsoluteLink)">
    <meta property="twitter:image:alt" content="$OpenGraphImage.Title">
<% end_if %>
