interface SidebarIconProps {
  type: string;
  isActive?: boolean;
  className?: string;
}

export function SidebarIcon({
  type,
  isActive = false,
  className = "",
}: SidebarIconProps) {
  const fillColor = isActive ? "white" : "#949EA2";
  const strokeColor = isActive ? "white" : "#949EA2";

  const icons = {
    home: (
      <svg
        width="24"
        height="27"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M13.338 1.05839C12.9707 0.699826 12.4941 0.501423 12 0.501423C11.5059 0.501423 11.0293 0.699826 10.662 1.05839L0 11.4671V22.748C0 23.6685 0.337142 24.5514 0.937258 25.2024C1.53737 25.8533 2.35131 26.219 3.2 26.219H7V18.5947C7 17.1563 7.52678 15.7768 8.46447 14.7597C9.40215 13.7426 10.6739 13.1712 12 13.1712C13.3261 13.1712 14.5979 13.7426 15.5355 14.7597C16.4732 15.7768 17 17.1563 17 18.5947V26.2157H20.8C21.6487 26.2157 22.4626 25.85 23.0627 25.1991C23.6629 24.5482 24 23.6653 24 22.7447V11.4639L13.338 1.05839Z"
          fill={fillColor}
        />
      </svg>
    ),
    music: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 22.1874C17.5228 22.1874 22 17.7103 22 12.1874C22 6.66458 17.5228 2.18742 12 2.18742C6.47715 2.18742 2 6.66458 2 12.1874C2 17.7103 6.47715 22.1874 12 22.1874Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15.1874C13.6569 15.1874 15 13.8443 15 12.1874C15 10.5306 13.6569 9.18742 12 9.18742C10.3431 9.18742 9 10.5306 9 12.1874C9 13.8443 10.3431 15.1874 12 15.1874Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    play: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 3.21887L19 12.2189L5 21.2189V3.21887Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    user: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20 21.2503V19.2503C20 18.1895 19.5786 17.1721 18.8284 16.4219C18.0783 15.6718 17.0609 15.2503 16 15.2503H8C6.93913 15.2503 5.92172 15.6718 5.17157 16.4219C4.42143 17.1721 4 18.1895 4 19.2503V21.2503"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.2503C14.2091 11.2503 16 9.45947 16 7.25034C16 5.0412 14.2091 3.25034 12 3.25034C9.79086 3.25034 8 5.0412 8 7.25034C8 9.45947 9.79086 11.2503 12 11.2503Z"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    download: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M17 12.9673L12 17.9736L7 12.9673M12 6.95978V16.9724V6.95978ZM12 1.95349C18.075 1.95349 23 6.88469 23 12.9673C23 19.05 18.075 23.9812 12 23.9812C5.925 23.9812 1 19.05 1 12.9673C1 6.88469 5.925 1.95349 12 1.95349Z"
          stroke={strokeColor}
          strokeWidth="2"
        />
      </svg>
    ),
  };

  return icons[type as keyof typeof icons] || null;
}
