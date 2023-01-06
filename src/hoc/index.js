const withDefaultProps = (createComponent, defaultProps) => (props) => createComponent({ ...defaultProps, ...props });

export { withDefaultProps };
